'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link'
import Navbar from '@/components/Navbar';
import { Lock, Shield, Zap } from 'lucide-react';



export default function LangingPage(){

    const {user} = useAuth()

    return(
         <div className='min-h-screen bg-gray-50'>
            <Navbar/>
            <section className='max-w-6xl mx-auto px-6 py-20 flex items-center    gap-12'>
                <div className='flex-1 border-gray-500 '>
                     <h1 className='text-4xl font-bold text-gray-900 mv-4 leading-tight'>Secure, Simple <br/> JWT Authentication </h1>
                <p className='text-gray-500 mb-8 mt-6 ' >A complete authentication system built with Next.js, JWT, and secure best practices.</p>
            <div className='flex gap-3'>
               {user ? (
                <Link href='/dashboard' className='bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors'>Go to Dashboard</Link>

               ):(
                <>
                <Link href='/register' className='bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors'>Get Started</Link>
                <Link href='/login' className='border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover-bg-gray-50 transition-colors'>login</Link>
                </>
               )}
            </div>
                </div>
                <div className='hidden md:flex w-64 h-64 bg-primary/10 rounded-2xl items-center justify-center '>
                <div className='w-32 h-32 bg-primary/20 rounded-2xl flex items-center justify-center'>
                      <Shield size={56} className='text-primary' />
                </div>

                </div>

            </section>
            <section>
                <div className='max-w-6xl mx-auto px-6 pb-20 '>
                  <div className='grid grid-cols-3 gap-6'>
                    {
                        [
                            {icon: Shield, title: 'Secure', desc: 'JWT tokens with httpOnly cookies'},
                            {icon: Lock, title: 'Protected', desc:' Route protection with middleware' },
                            {icon: Zap, title: 'Simple', desc: "easy to use and developer friendly"}
                        ].map(({icon: Icon, title, desc})=>(
                            <div key={title} className='bg-white rounded-xl border border-gray-100 p-6 text-center'>
                                <div className='w-10 h-10 bg-primary/10 rounded-xl flex  mx-auto mb-3 items-center justify-center '>
                                      <Icon size={20} className='text-primary' />
                                </div>
                                <h3 className='font-semibold text-gray-900 mb-1'>
                                    {title}
                                </h3>
                                <p className='text-sm text-gray-500' >{desc}</p>
                            </div>
                        ))
                    }

                  </div>
                </div>
            </section>
            

         </div>

    )

}