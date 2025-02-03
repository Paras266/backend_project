import mongoose , {Schema}from "mongoose";
import bcrypt from "bcrypt" ;
import jsonwebtoken from "json-web-token"
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

UserSchema.pre("save" , async function(next){
    if(!this.isModified("password")) next() ;
    this.password = await bcrypt.hash(this.password , 10)
    next()
})

UserSchema.methods.isPasswordcorrect = async function(password) {
   return await bcrypt.compare(password , this.password)
}
UserSchema.methods.generateAccestoken = function(){
    return jsonwebtoken.sign({
        _id : this._id ,
        email : this.email ,
        username : this.username ,
        fullName : this.fullName
    } ,
     process.env.JWT_ACCESS_SECRET , 
     {
        expiresIn : process.env.JWT_ACCESS_EXPIRE
    })
}
UserSchema.methods.generateRefreshtoken = function(){
    return jsonwebtoken.sign({
        _id : this._id , 
    } ,
     process.env.JWT_REFRESH_SECRET , 
     {
        expiresIn : process.env.JWT_REFRESH_EXPIRE
    })
}
export const User = mongoose.model("User", UserSchema)