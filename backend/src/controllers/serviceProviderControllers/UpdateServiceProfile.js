/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import ServiceProvider from "../../models/ServiceProvider.js";
import bcrypt from 'bcryptjs'
const UpdateServiceProfile = async (req, res) => {
    const { id } = req.params;
    console.log("ID: ", id);
    const {
        businessLogo,
        businessName,
        businessEmail,
        businessAddress,
        mobileNumber,
        businessDescription,
        servicesOffered,
        businessHours,
        paymentMethods,
        cancellationPolicy,
        socialMediaLinks,
        certifications,
        termsAndConditions,
        privacyPolicy,
        password
    } = req.body;
   
    console.log("Body: ", req.body);
   
    const updateFields = {};
    if (businessLogo) updateFields.businessLogo = businessLogo;
    if (businessName) updateFields.businessName = businessName;
    if (businessEmail) updateFields.businessEmail = businessEmail;
    if (businessAddress) updateFields.businessAddress = businessAddress;
    if (businessDescription) updateFields.businessDescription = businessDescription;
    if (mobileNumber) updateFields.mobileNumber = mobileNumber;
    if (servicesOffered) updateFields.servicesOffered = servicesOffered;
    if (businessHours) updateFields.businessHours = businessHours;
    if (paymentMethods) updateFields.paymentMethods = paymentMethods;
    if (cancellationPolicy) updateFields.cancellationPolicy = cancellationPolicy;
    if (socialMediaLinks) updateFields.socialMediaLinks = socialMediaLinks;
    if (certifications) updateFields.certifications = certifications;
    if (termsAndConditions) updateFields.termsAndConditions = termsAndConditions;
    if (privacyPolicy) updateFields.privacyPolicy = privacyPolicy;
   
    if (password) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
      } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
      }
   }
   
    try {
       const result = await ServiceProvider.findByIdAndUpdate(id, updateFields, { new: true });
       if (!result) {
         return res.status(404).json({ msg: "User not found" });
       }
       res.json({ msg: "Service Provider updated successfully", user: result });
    } catch (err) {
       console.error(err.message);
       res.status(500).send("Server Error");
    }
}

export default UpdateServiceProfile