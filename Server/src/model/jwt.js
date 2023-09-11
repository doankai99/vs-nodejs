import mongoose from "mongoose";
const { Schema } = mongoose;

const jwtokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  email: {
    type: String,
    ref: 'Users'
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
    required: true,
  },
}, {
  timestamps: true,
});

export const Jwtoken = mongoose.model('Jwtoken', jwtokenSchema);