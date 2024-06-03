// Author: Akshat Shah
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  listing_id: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  payment_status: {
    type: String,
    enum: ["pending", "success", "failed"],
    required: true,
  },
  payment_amount: { type: Number, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
