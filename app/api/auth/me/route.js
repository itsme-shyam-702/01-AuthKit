import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {

  try{
    const token = cookies().get('token')?.value
    if(!token) return NextResponse.json({user: null})
    const payload = verifyToken(token)
    
    await connectDB()
    const user = await User.findByID(payload.id)
    if(!user) return NextResponse.json({user: null})
    
    return NextResponse.json({
      user:{
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
        createdAt: user.createdAt
      }
    })
  } catch {
    return NextResponse.json({user: null})
  }  
}