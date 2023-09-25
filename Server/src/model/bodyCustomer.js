import mongoose from "mongoose";
const {Schema} = mongoose;
const bodyCustomerSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        unique: true
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

    chestWidth: {
        type: Number,
        required: true
    },

    backWidth: {
        type: Number,
        required: true
    },

    aroundNeck: {
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