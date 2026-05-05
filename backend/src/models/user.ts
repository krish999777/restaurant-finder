import mongoose from 'mongoose'

const user=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        required:true,
        default:"user"
    }
},{ timestamps: true })

export type UserType = {
  _id: string
  name: string
  email: string
  role: string
}
export default mongoose.model('User',user)