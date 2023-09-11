import mongoose from "mongoose";
const {Schema} = mongoose;
const bodyCustomerSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    chest: {
        type: Number,
        required: true
    },
    waist: {
        type: Number,
        required: true
    },
    hips: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

const BodyCustomer = mongoose.model("BodyCustomer", bodyCustomerSchema);

export default BodyCustomer;