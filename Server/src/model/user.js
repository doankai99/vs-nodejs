import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    image: {
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    ward: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Number,
        default: 0,
    }
},  {
    timestamps: true,  
})

export const Users = mongoose.model('Users', userSchema);