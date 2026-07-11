'use client'

import { useAuth } from '@/context/AuthContext'
import { Home, Info, LayoutDashboard, LogOut, Mail, Shield, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Dashboard() {
  
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(()=>{
    if (!loading && !user)router.push('/login')
  },[user,loading,router])
  
  if (loading || !user) return (
    <div className='min-h-screen flex items-center justify-center'> 
    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary '></div>
    </div>
  )

  const initials = user.name?.split(' ').map(n => n[0]).join('').slice(0,2) || 'JD'

  return (
    <div className='min-h-screen bg-gray-50 flex '>
      <aside className='w-56 bg-white border-r border-gray-100 flex flex-col '>
        <div className='p-5 border-b border-gray-100'>
          <div className='flex items-center gap-2 '>
            <div className='w-7 h-7 bg-primary rounded-lg flex items-center justify-center'>
              <Shield size={18} className='text-white' />
          </div>
          <span className='font-semibold text-gray-900 '> AuthKit </span>
        </div>

          </div>
          
          <nav className='flex-1 p-4 space-y-1'>
              <Link href='/dashboard' className='flex items-center gap-2.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium '> <LayoutDashboard size={16}/> Overview</Link>
              <Link href='/profile' className='flex items-center gap-2.5 px-3 py-2 rounded-lg  text-gray-600 hover:bg-gray-100 text-sm  '> <User size={16}/> Profile</Link>
              <Link href='/' className='flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100  text-sm '> <Home size={16}/> Home</Link>
              <Link href='/about' className='flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100  text-sm  '> <Info size={16}/>About</Link>
              <Link href='/contact' className='flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100  text-sm  '> <Mail size={16}/> Contact</Link>
          </nav>
          <div className='p-4 border-t border-gray-100'>
            <button onClick={logout} className='flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-500 text-sm w-full'> <LogOut size={16} /> Logout </button>
          </div>
      </aside>

    <main className='flex-1 p-8'>
        <div className='flex items-center justify-between mb-8 '>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 '> Dashboard </h1>
            <p className='text-gray-500 text-sm'>Wellcome back, {user.name} 👋</p>
          </div>
        <div className='flex items-center gap-2 '>
            <div className='w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-sm'>
            {initials}
            </div>
            <span className='text-sm font-medium text-gray-700'>{user.name}</span>
        </div>
        </div>
        
    </main>
      
    </div>
  )
}

export default Dashboard
