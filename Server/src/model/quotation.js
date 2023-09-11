import mongoose from "mongoose";
const {Schema} = mongoose;

const quotationSchema = new Schema({

    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    quotationDate: {
        type: Date,
        required: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        fabricId: {
            type: Schema.Types.ObjectId,
            ref: 'Fabric',
            required: true
        },
        priceRowId: {
            type: Schema.Types.ObjectId,
            ref: 'PriceRow',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
}, {
    timestamps: true
});

const Quotation = mongoose.model('Quotation', quotationSchema);