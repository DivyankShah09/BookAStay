/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import express from "express";
import cors from "cors";
import UserController from "../controllers/userControllers/UserController.js";
import UpdateUser from "../controllers/userControllers/UpdateUserProfile.js";
import GetUserProfile from "../controllers/userControllers/GetUserProfile.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { Roles } from "../enums/RoleEnum.js";

const router = express.Router();

router.use(cors());

router.post("/createUserProfile", verifyToken(Roles.USER), UserController);
router.put("/updateUserProfile/:id", verifyToken(Roles.USER), UpdateUser);
router.get("/getUserProfile", verifyToken(Roles.USER), GetUserProfile);

export default router;
