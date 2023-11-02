import mongoose from "mongoose";
import shortid from "shortid";
const {Schema} = mongoose;

const feedbackSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'PriceRow',
        required: true
    },

    description: {
        type: String,
        default: '',
    },

    feedback: {
        type: Number,
        default: 0
    },

    feedbackTime: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
})

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;