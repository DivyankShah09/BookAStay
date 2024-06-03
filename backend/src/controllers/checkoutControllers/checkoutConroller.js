// Author: Akshat Shah
import Stripe from "stripe";
import "dotenv/config";

import Listing from "../../models/Listing.js";

const stripeClient = await Stripe(process.env.STRIPE_PRIVATE_KEY);

const getCheckoutItem = async (listingId) => {
  const listing = await Listing.findById(listingId);
  return {
    name: listing.name,
    priceInCents: parseFloat(listing.price) * 100,
  };
};

const redirect = {
  success: `${process.env.BACKEND_URL}/api/booking-confirm`,
  cancel: `${process.env.BACKEND_URL}/api/booking-confirm`,
};

export const checkout = async (req, res) => {
  try {
    const item = await getCheckoutItem(req.body.listingId);
    const userID = req.userId;
    console.log(parseInt(req.body.price_amount));
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: item.name,
            },
            unit_amount: parseInt(req.body.price_amount) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${
        redirect.success
      }?user_id=${userID}&session_id={CHECKOUT_SESSION_ID}&listing_id=${
        req.body.listingId
      }&price=${parseInt(req.body.price_amount) * 100}`,
      cancel_url: `${
        redirect.cancel
      }?user_id=${userID}&session_id={CHECKOUT_SESSION_ID}&listing_id=${
        req.body.listingId
      }&price=${parseInt(req.body.price_amount) * 100}`,
    });
    res.json({ url: session.url })
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};
