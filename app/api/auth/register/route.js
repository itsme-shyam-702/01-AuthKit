import { AppError } from "@/lib/appError";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { signToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import { registerSchema } from "@/lib/zodSchemas";
import User from "@/models/User";
import bcrypt from "bcryptjs/dist/bcrypt";
import { NextResponse } from "next/server";




export const POST = asyncWrapper(async (req)=>{
  const body = await req.json()
  const result = registerSchema.safeParse(body)
  if(!result.success) throw new AppError (result.error.errors[0].message,400 )

  const {name, email, password} = result.data
  
  await connectDB()

  const existing = await User.findOne({email})
  if (existing) throw new AppError("Email already registered", 409)

  const  hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role:'user',
    provider: 'credentials'
  })

  const token = signToken({id: newUser._id.toString(), email: newUser.email, role: newUser.role})
  const response = NextResponse.json({
    user: {id: newUser._id.toString(),name:newUser.name, email: newUser.email, role: newUser.role},
  },{status: 201})

  response.cookies.set('token', token, {httpOnly: true, path: '/', maxAge: 60 * 60 *24 * 7})
  return response
})