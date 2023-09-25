import mongoose from "mongoose";
const {Schema} = mongoose;

const bodyMeasurementSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    chestSize: {
        type: Number
    },
    waistSize:{
        type: Number
    },
    hipsSize: {
        type: Number
    },
    chestWidth: {
        type: Number
    },
    backWidth: {
        type: Number
    },
    aroundNeck: {
        type: Number
    },
});

const BodyMeasurement = mongoose.model('BodyMeasurement', bodyMeasurementSchema);

export default BodyMeasurement;