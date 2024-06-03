/**
 * Name: Nikunj Lalitkumar Hudka
 * Banner ID: B00959783
 */
import { UserStatus } from "../../enums/StatusEnum.js";
import ServiceProvider from "../../models/ServiceProvider.js";
import { sendApproveServiceProviderEmail, sendRejectServiceProviderEmail } from "../../services/emailService.js";

export const getPendingVerifications = async (req, res) => {
  try {
    const pendingVerificationUsers = await ServiceProvider.find({
      isVerified: UserStatus.PENDING,
    });
    res.json(pendingVerificationUsers);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const getVerifiedUsers = async (req, res) => {
  try {
    const verifiedUsers = await ServiceProvider.find({
      isVerified: UserStatus.APPROVED,
    });
    res.json(verifiedUsers);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const approveServiceProvider = async (req, res) => {
  try {
    const serviceProviderId = req.params.id;
    const serviceProvider = await ServiceProvider.findByIdAndUpdate(
      serviceProviderId,
      {
        isVerified: UserStatus.APPROVED,
      }
    );
    sendApproveServiceProviderEmail(serviceProvider.businessEmail);
    res.json(serviceProvider);
  } catch (error) {
    res.status(404).send("User not found.");
  }
};

export const rejectServiceProvider = async (req, res) => {
  try {
    const serviceProviderId = req.params.id;
    const serviceProvider = await ServiceProvider.findByIdAndUpdate(
      serviceProviderId,
      {
        isVerified: UserStatus.REJECTED,
      }
    );
    sendRejectServiceProviderEmail(serviceProvider.businessEmail);
    res.json(serviceProvider);
  } catch (error) {
    res.status(404).send("User not found.");
  }
};
