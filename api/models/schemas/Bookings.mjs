import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    name: String,
    checkIn: Date,
    checkOut: Date,
    guests: Number,
    totalPrice: Number,
    bookeddate: { type: Date, default: Date.now }
});

export const Booking = mongoose.model('Booking', BookingSchema);
