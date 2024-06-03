/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import mongoose from "mongoose";
import { Roles } from "../enums/RoleEnum.js";
import { UserStatus } from "../enums/StatusEnum.js";

const serviceProviderSchema = new mongoose.Schema({
  businessLogo: { type: String },
  businessName: { type: String, required: true },
  businessLastName: { type: String, required: true },
  businessEmail: { type: String, required: true },
  businessAddress: { type: String },
  mobileNumber: { type: String },
  businessWebsite: { type: String },
  businessDescription: { type: String },
  servicesOffered: [{ type: String }],
  businessHours: { type: String },
  paymentMethods: [{ type: String }],
  cancellationPolicy: { type: String },
  socialMediaLinks: [{ type: String }],
  certifications: [{ type: String }],
  termsAndConditions: { type: String },
  privacyPolicy: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userType: { type: String, enum: Roles, required: true },
  password: { type: String, required: true },
  isVerified: { type: String, enum: UserStatus, default: UserStatus.PENDING, required: true },
});

// Export the model
const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);

export default ServiceProvider;
