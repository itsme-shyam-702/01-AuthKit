'use client'

import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"



const AuthContext = createContext(null)

export function AuthProvider({children}){
  const [user, setUser ]= useState(null)
  const [loading, setLoading ] = useState(true)
  const router = useRouter()

  useEffect(()=>{
    fetch('/api/auth/me').then(r => r.json()).then(data =>{
      if (data.user) setUser(data.user)
    }).catch(()=> {}).finally(()=> setLoading(false))
  },[])

  const login = async (email,password) =>{
    const res = await fetch('/api/auth/login',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email,password})
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.error)
    setUser(data.user)  
  router.push('/dashboard')
  }

const register = async (formData)=>{
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
    setUser(data.user)
  router.push('/dashboard')
}

const logout = async ()=>{
  await fetch('/api/auth/login', {method: 'DELETE'})
  setUser(null)
  router.push('/')
}

return (
  <AuthContext.Provider value={{user, loading, login, register, logout}}>
     {children}
  </AuthContext.Provider>
)


}

export const useAuth = ()=> useContext(AuthContext)