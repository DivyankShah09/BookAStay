/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { Roles } from "../../enums/RoleEnum.js";
import { UserStatus } from "../../enums/StatusEnum.js";

const UserController = async (req, res) => {
  try {
    console.log("Body: ", req.body);

    // Find the existing user by email
    const existingUser = await User.findOne({ email: req.body.email });
    console.log("Existing User: ", existingUser);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the existing user's data
    existingUser.img = req.body.img;
    existingUser.firstName = req.body.firstName;
    existingUser.lastName = req.body.lastName;
    existingUser.dob = req.body.dateOfBirth;
    existingUser.mobileNumber = req.body.phoneNumber;
    existingUser.gender = req.body.gender;
    existingUser.email = req.body.email;
    existingUser.address = req.body.address;
    existingUser.country = req.body.country;
    existingUser.travelDestinations = req.body.travelDestinations;
    existingUser.userType = Roles[existingUser.userType.toUpperCase()];
    existingUser.password = existingUser.password;
    existingUser.isVerified = UserStatus.PENDING;

    // Save the updated user
    const updatedUser = await existingUser.save();

    console.log("Updated User: ", updatedUser);
    console.log("User updated successfully");

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export default UserController;
