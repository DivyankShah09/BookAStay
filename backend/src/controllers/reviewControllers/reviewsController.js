/**
 * Name: Aman Harishkumar Desai
 * Banner ID: B00965752
 */
import Listing from "../../models/Listing.js";

/**
 * Add a review to a listing
 * It first checks if the user has already reviewed the listing.
 * If the user has already reviewed the listing, it updates the review.
 * If the user has not reviewed the listing, it adds a new review.
 * It then calculates the new cumulative rating for the listing.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 *
 */
export const addReview = async (req, res) => {
  try {
    const { listingId, userId, firstName, lastName, rating, comment } =
      req.body;
    var newReview;
    // Find the listing by ID
    const listing = await Listing.findById(listingId);

    // Check if the user already has a review
    const existingReviewIndex = listing.reviews.findIndex(
      (review) => String(review.user) === userId
    );

    // if (existingReviewIndex !== -1) {
    //   // If the user already has a review, update it
    //   listing.reviews[existingReviewIndex].rating = rating;
    //   listing.reviews[existingReviewIndex].comment = comment;
    //   listing.reviews[existingReviewIndex].date = new Date();
    //   listing.reviews[existingReviewIndex].firstName = firstName;
    //   listing.reviews[existingReviewIndex].lastName = lastName;
    // } else {
    // If the user does not have a review, create a new one
    newReview = {
      user: userId,
      rating,
      firstName,
      lastName,
      comment,
      date: new Date(),
    };

    // Add the new review to the listing's reviews array
    listing.reviews.push(newReview);
    // }

    // Calculate the new cumulative rating for the listing
    const totalRatings = listing.reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    const averageRating = totalRatings / listing.reviews.length;

    // Update the listing's cumulative rating
    listing.rating = averageRating;

    // Save the updated listing
    await listing.save();

    res.status(201).json({
      message: "Review added successfully",
      newReview: listing.reviews[existingReviewIndex] || newReview,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add review", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { listingId, userId } = req.body;
    // Find the listing by ID
    const listing = await Listing.findById(listingId);

    // Check if the user already has a review
    const existingReviewIndex = listing.reviews.findIndex(
      (review) => String(review.user) === userId
    );

    if (existingReviewIndex !== -1) {
      // If the user already has a review, delete it
      listing.reviews.splice(existingReviewIndex, 1);
    } else {
      res.status(404).json({ message: "Review not found" });
    }

    // Calculate the new cumulative rating for the listing
    const totalRatings = listing.reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    const numberOfReviews = listing.reviews.length;

    const averageRating =
      numberOfReviews > 0 ? totalRatings / numberOfReviews : 0;

    console.log("Average rating:", averageRating);
    console.log("rating:", listing.rating);
    // Update the listing's cumulative rating
    listing.rating = averageRating;

    // Save the updated listing
    await listing.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to delete review", error: error.message });
  }
};
