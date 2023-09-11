import mongoose from "mongoose";
const {Schema} = mongoose;

const fabricSchema = new Schema({

    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    size: {
        type: String,
    },
    
    color: {
        type: String
    },

    material: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        default: 'USD'
    },

    description: {
        type: String
    },

}, {
    timestamps: true
});

const Fabric = mongoose.model('Fabric', fabricSchema);

export default Fabric