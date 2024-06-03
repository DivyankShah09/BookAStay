/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import jwt from "jsonwebtoken"
import User from "../../models/User.js";
import bcrypt from 'bcryptjs'

const GetUserProfile = async (req, res) => {
    try {
        const userID = req.userId
    const user = await User.findById(userID).select('-password')
    // console.log("User: ", user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
} catch (error) {
    res.status(500).json({ message: 'Server error' });
 }
}

export default GetUserProfile;