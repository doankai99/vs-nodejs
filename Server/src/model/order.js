import mongoose from "mongoose";
import shortid from "shortid";
const {Schema} = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    product: [{
            type: String,
            ref: 'PriceRow',
            required: true,
            unique: true,
        }],

    status: {
        type: Number,
        required: true,
        default: 0
    },

    startTime: {
        type: String,
        required: true,
        default: ''
    },

    endTime: {
        type: String,
        required: true,
        default: ''
    },

    shippingAddress: {
        type: String,
    },

    paymentMethod: {
        type: Number,
        required: true,
        default: 0
    },

    shippingCode: {
        type: String,
        default: shortid.generate,
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);

export default Order;