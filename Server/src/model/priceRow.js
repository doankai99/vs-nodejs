import mongoose from "mongoose";
import shortid from "shortid";
const {Schema} = mongoose;

const priceRowSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    fabricId: {
        type: Schema.Types.ObjectId,
        ref: 'Fabric',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    priceGroup: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    taxRate: {
        type: Number,
        default: 0
    },
    isPromotion: {
        type: Boolean,
        default: false
    },
    promotionDescription: {
        type: String
    }
    
}, {
    timestamps: true
})

const PriceRow = mongoose.model("PriceRow", priceRowSchema);

export default PriceRow;