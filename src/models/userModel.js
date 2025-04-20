import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    unique: true,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = model('Users', userSchema);

export default User;
