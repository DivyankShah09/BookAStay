/**
 * Created By: Divyank Mayankkumar Shah
 * BannerId : B00966377
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { Roles } from "../../enums/RoleEnum.js";
import ServiceProvider from "../../models/ServiceProvider.js";

export const login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    let user;
    if (
      userType.toLowerCase() === Roles.USER ||
      userType.toLowerCase() === Roles.ADMIN
    ) {
      user = await User.findOne({ email });
    } else {
      user = await ServiceProvider.findOne({ businessEmail: email });
    }

    if (!user) {
      return res.json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    const payload = {
      user: {
        id: user.id,
        userType: userType.replace(" ", "_").toLowerCase(),
      },
    };

    if (!isMatch) {
      return res.json({ message: "Invalid Credentials" });
    }

    jwt.sign(payload, "secretKey", (err, token) => {
      if (err) throw err;
      res.json({
        token,
        userType: userType,
        userEmail: email,
        userId: user.id,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
