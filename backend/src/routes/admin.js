/**
 * Name: Nikunj Lalitkumar Hudka
 * Banner ID: B00959783
 */
import express from "express";
import {
  approveServiceProvider,
  getPendingVerifications,
  getVerifiedUsers,
  rejectServiceProvider,
} from "../controllers/adminControllers/adminController.js";

const router = express.Router();

router.get("/pendingVerifications", getPendingVerifications);

router.get("/verifiedUsers", getVerifiedUsers);

router.post("/approveUser/:id", approveServiceProvider);

router.post("/rejectUser/:id", rejectServiceProvider);

export default router;
