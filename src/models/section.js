/* eslint-disable func-names */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  quantity: Number,
  type: String,
  seats:
    [{ seatNumber: Number,
        purchased: { type: Boolean, default: false },
    }],
  price: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Section', sectionSchema);
