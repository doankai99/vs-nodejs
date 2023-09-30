import mongoose from "mongoose";
const {Schema} = mongoose;

const appointmentSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
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
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true,
    },

    status: {
      type: Number,
      default: 1,
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