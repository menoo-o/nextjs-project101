import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "pls provide a username"],
        unique: true,
    },

    email: {
        type: String,
        required: [true, "pls provide a email"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "pls provide a passwd"],
       
    },

    isVerified:{
        type:Boolean,
        default: false,
    },

    isAdmin:{
        type:Boolean,
        default: false,
    },

})


const User = mongoose.models.users || mongoose.model("users", userSchema);


export default User ;