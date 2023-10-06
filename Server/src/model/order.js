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
    }],

    quantity: {
        type: Number,
        default: 1,
    },

    status: {
        type: Number,
        required: true,
        default: 1
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

    paymentStatus: {
        type: Number,
        default: 0
    },

    // paymentGateway: {
    //     type: String,
    //     default: "VNPAY"
    // },
    // transactionId: {
    //     type: String,
    //     default: null
    // },

    shippingCode: {
        type: String,
        default: shortid.generate,
    },

    totalCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);

export default Order;