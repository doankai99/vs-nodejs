import mongoose from "mongoose";
const { Schema } = mongoose;

const jwtokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
}, {
  timestamps: true,
});

export const Jwtoken = mongoose.model('Jwtoken', jwtokenSchema);