/**
 * Name: Aman Harishkumar Desai
 * Banner ID: B00965752
 */
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
});

const listingSchema = new mongoose.Schema({
  img: { type: [], required: false },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: false },
  phoneNumber: { type: String, required: false },
  utilities: { type: [], required: false },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: false },
  address: { type: String, required: true },
  reviews: [reviewSchema],
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
