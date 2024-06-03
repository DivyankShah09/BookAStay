/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import User from "../../models/User.js";
import bcrypt from 'bcryptjs'

const UpdateUser = async (req, res) => {
 const { id } = req.params;
 console.log("ID: ", id);
 const {
    img,
    firstName,
    lastName,
    email,
    gender,
    mobileNumber,
    address,
    country,
    travelDestinations,
    password
 } = req.body;

 console.log("Body: ", req.body);

 const updateFields = {};
 if (img) updateFields.img = img;
 if (firstName) updateFields.firstName = firstName;
 if (lastName) updateFields.lastName = lastName;
 if (email) updateFields.email = email;
 if (gender) updateFields.gender = gender;
 if (mobileNumber) updateFields.mobileNumber = mobileNumber;
 if (address) updateFields.address = address;
 if (country) updateFields.country = country;
 if (travelDestinations) updateFields.travelDestinations = travelDestinations;

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
    const result = await User.findByIdAndUpdate(id, updateFields, { new: true });
    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: "User updated successfully", user: result });
 } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
 }
};

export default UpdateUser;
