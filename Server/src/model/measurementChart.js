import mongoose from "mongoose";
const {Schema} = mongoose;

const bodyMeasurementSchema = new Schema({
    size: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        required: true,
    },
    heightFrom: {
        type: Number,
        required: true
    },
    heightTo: {
        type: Number,
        required: true
    },
    weightFrom: {
        type: Number,
        required: true
    },
    weightTo: {
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
}, {
    timestamps: true
});

const BodyMeasurement = mongoose.model('BodyMeasurement', bodyMeasurementSchema);

export default BodyMeasurement;