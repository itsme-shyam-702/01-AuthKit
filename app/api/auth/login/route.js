import { AppError } from "@/lib/appError";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { signToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import { loginSchema } from "@/lib/zodSchemas";
import User from "@/models/User";
import bcrypt from "bcryptjs/dist/bcrypt";
import { NextResponse } from "next/server";

export const POST = asyncWrapper(async (req)=>{
  const body = await req.json()
  const result = loginSchema.safeParse(body)
  
  if(!result.success) throw new AppError(result.error.errors[0].message, 400)
   
  const {email, password} = result.data 
  
  await connectDB()

  const user = await User.findOne({email})
  if (!user) throw new AppError('Invalid credential', 401)
   
  const valid = await bcrypt.compare(password, user.password) 
  if (!valid) throw new AppError('Invalid credentials', 401)

  const token = signToken({id: user._id.toString(), email: user.email, role: user.role})
  const response = NextResponse.json({
    user:{
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      createdAt: user.createdAt,
    }
  })
  response.cookies.set('token', token, {httpOnly: true, path:'/', maxAge: 60 * 60 * 24 * 7})
  return response
})

export const DELETE = async () =>{
  const response = NextResponse.json({message: 'Logged out'})
  response.cookies.delete('token')
  return response
}