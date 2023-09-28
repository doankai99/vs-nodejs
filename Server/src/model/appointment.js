import mongoose from "mongoose";
const {Schema} = mongoose;

const appointmentSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        unique: true
    },
    name: {
        type: String
    },

    phone: {
        type: Number,
        required: true,
        minLength: 6,
    },

    email: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true,
    },

    area: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
    },

    country: {
        type: String
    }

}, {
    timestamps: true
})

const AppointmentModel = mongoose.model('AppointmentModel', appointmentSchema);

export default AppointmentModel;