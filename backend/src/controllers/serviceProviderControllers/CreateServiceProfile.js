/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import ServiceProvider from "../../models/ServiceProvider.js";
import { Roles } from "../../enums/RoleEnum.js";
import { UserStatus } from "../../enums/StatusEnum.js";

const CreateServiceProfile = async (req, res) => {
  try {
    console.log("Body: ", req.body);

    const existingServiceProvider = await ServiceProvider.findOne({
      businessEmail: req.body.businessEmail,
    });
    console.log("Existing ServiceProvider: ", existingServiceProvider);

    if (!existingServiceProvider) {
      return res.status(404).json({ error: "Service Provider Not Found" });
    }
    existingServiceProvider.businessLogo = req.body.businessLogo;
    existingServiceProvider.businessName = req.body.businessName;
    existingServiceProvider.businessEmail = req.body.businessEmail;
    existingServiceProvider.businessAddress = req.body.businessAddress;
    existingServiceProvider.mobileNumber = req.body.mobileNumber;
    existingServiceProvider.businessDescription = req.body.businessDescription;
    existingServiceProvider.servicesOffered = req.body.servicesOffered;
    existingServiceProvider.businessHours = req.body.businessHours;
    existingServiceProvider.paymentMethods = req.body.paymentMethods;
    existingServiceProvider.cancellationPolicy = req.body.cancellationPolicy;
    existingServiceProvider.socialMediaLinks = req.body.socialMediaLinks;
    existingServiceProvider.certifications = req.body.certifications;
    existingServiceProvider.termsAndConditions = req.body.termsAndConditions;
    existingServiceProvider.privacyPolicy = req.body.privacyPolicy;

    const savedServiceProvider = await existingServiceProvider.save();

    console.log("Saved Service Provider: ", savedServiceProvider);
    console.log("Service provider created successfully");

    res.status(200).json({
      message: "Service provider created successfully",
      savedServiceProvider,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export default CreateServiceProfile;
