import express from "express";
import { checkout } from "../controllers/checkoutControllers/checkoutConroller.js";
import { confirmBooking } from "../controllers/checkoutControllers/confirmBookingController.js";
import { bookingList, getBookingsByServiceProviderId } from "../controllers/checkoutControllers/bookingsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { Roles } from "../enums/RoleEnum.js";

const router = express.Router();

router.post("/create-checkout-session",verifyToken([Roles.USER]), checkout);
router.get("/booking-confirm",confirmBooking)
router.get("/bookings",verifyToken([Roles.USER]), bookingList);
router.get("/bookings/serviceProvider", verifyToken([Roles.SERVICE_PROVIDER]), getBookingsByServiceProviderId);
export default router;
