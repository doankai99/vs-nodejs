import { Int32 } from "mongodb";
import mongoose from "mongoose";
import shortid from "shortid";
const {Schema} = mongoose;

const productSchema = new Schema({

    image: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    product_type: {
        type: String
    },

    status: {
        type: Boolean,
        default: true
    },

    created_on: {
        type: Date,
        default: Date.now,
    },

    published_on: {
        type: Date,
        default: Date.now,
    },
    
    fabricId: {
        type: Schema.Types.ObjectId,
        ref: 'Fabric',
        required: true
    },

    summary: {
        type: String,
    },

}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

export default Product;