import mongoose, { mongo, Mongoose } from "mongoose";
import { type } from "node:os";
import { required, string } from "zod/v4-mini";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  provider: { type: String, default: 'credentials' }
}, { timestamps: true } )

export default mongoose.models.User || mongoose.model('User', userSchema)