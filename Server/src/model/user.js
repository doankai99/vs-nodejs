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
    access_token: {
        type: String

    },
    refesh_token: {
        type: String,
    },
    isAdmin: {
        type: Number,
        default: false,
    }
},  {
    timestamps: true,  
})

export const Users = mongoose.model('Users', userSchema);