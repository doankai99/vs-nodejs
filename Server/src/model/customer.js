import mongoose from "mongoose";
import shortid from "shortid";

const {Schema} = mongoose;

const customerSchema = new Schema({
    image: {
        type: String,
    },

    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    numberPhone: {
        type: String,
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    street: {
        type: String
    },

    ward: {
        type: String
    },

    district: {
        type: String
    },

    city: {
        type: String
    },

    country: {
        type: String
    },

}, {
    timestamps: true,
})

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;