/**
 * Name: Aman Harishkumar Desai
 * Banner ID: B00965752
 *
 * Name: Shyamal Prajapati
 * Banner id: B00958501
 *
 */
import express from "express";
import {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} from "../controllers/listingControllers/listingController.js";
import { getSearch } from "../controllers/listingControllers/filterListingController.js";
import {
  addReview,
  deleteReview,
} from "../controllers/reviewControllers/reviewsController.js";
import { Roles } from "../enums/RoleEnum.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/listings",
  verifyToken([Roles.SERVICE_PROVIDER, Roles.USER]),
  getListings
);
router.get(
  "/listings/:id",
  getListingById
);
router.post(
  "/create-listing",
  verifyToken([Roles.SERVICE_PROVIDER]),
  createListing
);
router.put(
  "/update-listing/:id",
  verifyToken([Roles.SERVICE_PROVIDER]),
  updateListing
);
router.get("/search", getSearch);
router.post("/add_review", verifyToken([Roles.USER]), addReview);
router.delete("/delete_review", verifyToken([Roles.USER]), deleteReview);
router.delete("/deleteServiceProvider/:id", verifyToken([Roles.SERVICE_PROVIDER]), deleteListing)
export default router;
