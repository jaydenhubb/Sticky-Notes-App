import bcrypt from "bcrypt"

export const hashPass = async(pass:string)=>{
    return await bcrypt.hash(pass, 10)
}