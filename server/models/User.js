const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["student","recruiter"],
        default:"student"
    },

    // ==========================
    // Password Reset OTP
    // ==========================

    resetOTP:{
        type:String,
        default:null
    },

    resetOTPExpire:{
        type:Date,
        default:null
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model("User", userSchema);