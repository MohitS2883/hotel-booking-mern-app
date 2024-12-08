import mongoose, { mongo } from 'mongoose';


const UserSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.String,
        required:true,
        unique:true
    },
    email:{
        type:mongoose.Schema.Types.String,
        required:false,
    },
    password:{
        type:mongoose.Schema.Types.String,
        required:false
    },
    photo:mongoose.Schema.Types.String,
    discordId: {
        type: mongoose.Schema.Types.String,
        unique: true, // Ensure uniqueness for Discord users
    },
})
export const User = mongoose.model('User',UserSchema)