/**
 * Created By: Divyank Mayankkumar Shah
 * BannerId : B00966377
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import ServiceProvider from "../../models/ServiceProvider.js";
import { Roles } from "../../enums/RoleEnum.js";
import { UserStatus } from "../../enums/StatusEnum.js";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, userType, email, password } = req.body;

    let user;
    if (userType.toLowerCase() === Roles.USER) {
      user = await User.findOne({ email });
    } else {
      user = await ServiceProvider.findOne({ businessEmail: email });
    }

    if (user) {
      return res.json({ message: "User already exists" });
    }

    let newUser;
    if (
      userType.toLowerCase() === Roles.USER ||
      userType.toLowerCase === Roles.ADMIN
    ) {
      newUser = new User({
        firstName: firstName,
        lastName: lastName,
        userType: Roles[userType.toUpperCase()],
        email: email,
        password: password,
        isVerified: UserStatus.PENDING,
      });
    } else {
      newUser = new ServiceProvider({
        businessName: firstName,
        businessLastName: lastName,
        userType: Roles[userType.toUpperCase()],
        businessEmail: email,
        password: password,
        isVerified: UserStatus.PENDING,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();

    // Create and return token
    const payload = {
      user: {
        id: newUser.id,
        userType: userType.replace(" ", "_").toLowerCase(),
      },
    };
    jwt.sign(payload, "secretKey", (err, token) => {
      if (err) throw err;
      res.json({ token, userEmail: email, userId: newUser.id });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
