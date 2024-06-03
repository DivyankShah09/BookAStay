/**
 * Created By: Divyank Mayankkumar Shah
 * BannerId : B00966377
 */

import express from "express";

import { signup } from "../controllers/authControllers/signupController.js";
import { login } from "../controllers/authControllers/loginController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
