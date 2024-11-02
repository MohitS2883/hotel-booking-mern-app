import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.String,
        require:true,
        unique:true
    },
    email:{
        type:mongoose.Schema.Types.String,
        require:true,
    },
    password:{
        type:mongoose.Schema.Types.String,
        required:true
    }
})
export const User = mongoose.model('User',UserSchema)