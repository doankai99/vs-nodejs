import mongoose from "mongoose";
const {Schema} = mongoose;

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
        default: '',
    },

    email: {
        type: String,
        required: true,
        unique: true,
        default: '',
    },
    numberPhone: {
        type: Number,
        required: true,
        unique: true,
        default: 0,
    },

    businessType: {
        type: String,
        default: '',
    },

    businessStatus: {
        type: String,
        default: true,
    },

    productCategories: [{
        type: String,
        default: [],
    }],

    logoUrl: {
        type: String,
        default: '',
    },
    street: {
        type: String,
        default: '',
    },
    ward: {
        type: String,
        default: '',
    },
    district : {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    }
})
export const CompanyMaster = mongoose.model('CompanyMaster', companySchema);