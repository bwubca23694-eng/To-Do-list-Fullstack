import User from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import {generateTokenAndSaveInCookies} from "../jwt/token.js"

const userSchema = z.object({
  email: z.string().email({ message: "invalid email" }),
  username: z.string().min(3, { message: "username must be 3 char" }),
  password: z.string().min(6, { message: "password must be 6 char" }),
});

////////singup page 
export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "all fiels ar requer " });
    }

    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      const errormessage = validation.error.issues.map((err) => err.message);
      return res.status(400).json({ errors: errormessage });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already register" });
    }
    const hashpassword = await bcrypt.hash(password, 10); 
    const newUser = new User({ email, username, password: hashpassword });
    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      return res
        .status(201)
        .json({ message: "user register successfully", newUser,token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error register " });
  }
};
//////////////////////////login page 
export const login = async (req, res) => {
 const {email,password}= req.body;
 try{

  if(!email || !password){
     return res.status(400).json({ message: "all field are required " });
  }

  const user = await User.findOne({email}).select("+password");
  if(!user || !(await bcrypt.compare(password,user.password))){
    return res.status(400).json({ message: "invalid email or passoword" });
  }
  const token = await generateTokenAndSaveInCookies(user._id, res);
   return res.status(200).json({
     message: `login successful ${user.username}`,
     token,  
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });

 }catch(error){ 
  console.log(error)
  res.status(500).json({ message: "error login " });
 }
};

//////////logout page 

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error logging out" });
  }
};

