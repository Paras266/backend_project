import {asyncHandler} from "../utils/asyncHandler.js" ;
import {ApiError} from "../utils/ApiError.js" ;
import { User } from "../model/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"  
import { ApiResponse } from "../utils/ApiResponse.js";



const RegisterUser = asyncHandler(async  (req,res)=>{
   const {username , email , password , fullname} = req.body ;
   
   if ([username , email , password , fullname].some((field)=>{
        if(field === "") return true
   })) {
      throw new ApiError(400 , "some values are missing")
   }
   
   const existUser = User.findOne(
   { $or : [{username}, {email}]}
   )
   
   
   if (existUser) {
    throw new ApiError(409 , "user already exist")
   }

   const avatarimagepath = req.files?.avatar[0]?.path ;
   const coverimagepath = req.files?.coverImage[0]?.path ;
    
   if (!avatarimagepath) {
    throw new ApiError(400 , "avatar is not found")
   }



   const avatar = await uploadOnCloudinary(avatarimagepath)
   const coverImage = await uploadOnCloudinary(coverimagepath)

   if (!avatar) {
    throw new ApiError(400 , "avatar is not upload")
   }
   
  const userr = await User.create({
    email,
    username : username.toLowerCase(),
    fullname,
    password,
    avatar : avatar.url ,
    coverImage : coverImage?.url || ""
   })

   const createdaUser = User.findbyId(user._id).select(
    "-password -refreshtoken"
)
if (!createdaUser) {
    throw new ApiError(500 , "user is not created")
}
return res.status(201).json(
    new ApiResponse(200,createdaUser,"user register succesfully")
)
})




export {RegisterUser}