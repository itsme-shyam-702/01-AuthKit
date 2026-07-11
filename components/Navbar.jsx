'use client'

import Link from 'next/link'
import { useAuth } from "@/context/AuthContext"
import { LogOut, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"


const navLinks = [
  { href: '/', label: 'Home'},
  {href: '/about', label: 'About'},
  { href: '/contact', label: 'Contact' },
]

export default function Navbar(){
  const {user, logout} = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const router = useRouter()    

  useEffect(()=>{
    function handleClickOutside(e){
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)

    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  },[])

  const initials = user?.name?.split(' ').map(n=> n[0] ).join('').slice(0,2).toUpperCase() || 'U'

  const handleLogout = async ()=>{
    setOpen(false)
    await logout()
    router.push('/')
  }

  return (

    <nav className="bg-white border-b border-gray-100 shadow-sm " >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href='/' className='flex items-center gap-2' >
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Shield size={18} className="text-white"/>
         
        </div>  <span className='font-semibold text-gray-900'>AuthKit  </span> <span  className='bg-green-600 flex items-center justify-between  w-auto h-5 py-2 px-2 text-white text-xs rounded-xl' >Project 01</span>
             
        </Link>
        <div className="flex items-center gap-6 ">
          {navLinks.map(link =>(
            <Link key={link.href} href={link.href} className="text-sm text-gray-600 hover:text-gray-900" >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link href="/profile" className="text-sm text-gray-600 hover:text-gray-900"  >
            Profile
            </Link>
          )}
          {user && (
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
          )}
          {user ? (
            <div className="relative" ref={menuRef} >
              <button onClick={()=>setOpen(o=>!o)} className="w-8 h-8 bg-primary/20 rounded-full flex  items-center justify-center text-primary font-semibold text-sm hover:bg-primary/30 transition-colors"  aria-label="account-menu" >
                {initials}
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50 ">
                    <div className="px-4 py-2 border-b  border-gray-50" > 
                      <p className="text-sm font-medium text-gray-900 truncate" > {user.name}   </p>
                      <p className="text-xs text-gray-500 truncate" > {user.email} </p>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors ">
                      <LogOut size={14} /> Logout
                    </button>
                </div>
              )}

            </div>
          ):(
            <Link href="/login" className="bg-primary text-white text-sm px-4 py-1.5 rounded-lg hover:bg-primary-dark transition-colors ">Login</Link>
          )}

        </div>
        
      </div> 

    </nav>

  )
}