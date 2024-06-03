import { PaymentStatus } from "../../enums/PaymentStatusEnum.js";
import Booking from "../../models/Booking.js";
import "dotenv/config";
import Stripe from "stripe";
import mongoose from "mongoose";
import { sendBookingConfirmationEmail } from "../../services/emailService.js";
import User from "../../models/User.js";

const stripeClient = await Stripe(process.env.STRIPE_PRIVATE_KEY);

console.log("added email for booking confirmation.");
const addBooking = async (listingId, priceInCents, userId, pstatus) => {
  try {
    const booking = new Booking({
      listing_id: new mongoose.Types.ObjectId(listingId),
      payment_amount: parseFloat(priceInCents) / 100,
      user_id: new mongoose.Types.ObjectId(userId),
      payment_status: pstatus,
    });
    await booking.save();
  } catch (err) {
    console.log(`Error store DB : ${err}`);
  }
};

export const confirmBooking = async (req, res) => {
  const session = await stripeClient.checkout.sessions.retrieve(
    req.query.session_id
  );
  const userID = req.query.user_id;
  const listingID = req.query.listing_id;
  const priceInCents = req.query.price;

  log
  const user = await User.findOne({ _id: userID });

  if (session.payment_status === "paid") {
    await addBooking(listingID, priceInCents, userID, PaymentStatus.SUCCESS);
    sendBookingConfirmationEmail(user.email);
    res.redirect(`${process.env.CLIENT_URL}/booking-history`);
  } else {
    res.redirect(`${process.env.CLIENT_URL}/payment/failure`);
    await addBooking(listingID, priceInCents, userID, PaymentStatus.FAILED);
  }
};
