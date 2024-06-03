/**
 * Name: Divyank Shah
 * Banner ID: B00966377
 */
import mongoose from "mongoose";
import { Roles } from "../enums/RoleEnum.js";
import { UserStatus } from "../enums/StatusEnum.js";

const userSchema = new mongoose.Schema({
  img: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: String },
  mobileNumber: { type: String },
  gender: { type: String },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  country: { type: String },
  travelDestinations: { type: [String] },
  userType: { type: String, enum: Roles, required: true },
  password: { type: String, required: true },
  isVerified: { type: String, enum: UserStatus, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
