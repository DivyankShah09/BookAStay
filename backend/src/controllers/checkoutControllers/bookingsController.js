import Booking from "../../models/Booking.js"
import Listing from "../../models/Listing.js";

const getBookingsWithListingDetails = async (userID) => {
  try {
    console.log(userID);
    const bookings = await Booking.find({ user_id: userID });

    const formattedBookings = [];
    console.log(bookings);
    for (const booking of bookings) {
      console.log("Booking Id:", booking.listing_id);
      const listing = await Listing.findById(booking.listing_id);
      console.log(listing);
      const formattedBooking = {
        listingName: listing?.name,
        paymentAmount: booking.payment_amount,
        paymentStatus: booking.payment_status,
      };

      formattedBookings.push(formattedBooking);
    }

    return formattedBookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const getBookingsByServiceProviderId = async (req, res) => {
  const serviceProviderId = req.userId;
  console.log("***********",serviceProviderId);
  try {
    const listingsByOwner = await Listing.find(
      { owner: serviceProviderId },
      "_id"
    );

    const listingIds = listingsByOwner.map((listing) => listing._id);

    const bookingsByOwner = await Booking.find({
      listing_id: { $in: listingIds },
    }).populate(["listing_id", "user_id"]);
    res.json(bookingsByOwner)
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error')
  }
}

export const bookingList = async (req,res) => {
    const userID = req.userId
    try {
      const bookings = await getBookingsWithListingDetails(userID);
      if(bookings){
        res.json({ result: bookings }).status(200)
      }
      else {
        res.json({ result: null }).status(200)
      }
    } catch (err) {
      res.status(500).json({ error: "Error fetching bookings" });
    }
}