/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import { firebaseInitializeApp } from "../../config/firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import User from "../../models/User.js";

export const uploadUserImage = async (req, res) => {
  try {
    const { id } = req.body;
    const img = req.files;
    console.log("Image: ", img);
    const storage = getStorage(firebaseInitializeApp);
    const bucket = ref(storage, "images");
    const storageRef = ref(storage);

    const imageUrls = await Promise.all(
      img.map(async (imagePath) => {
        console.log("Image path: " + imagePath);
        const fileSnapshot = await uploadBytesResumable(
          ref(storageRef, "images/" + imagePath.originalname),
          imagePath.buffer
        );
        const downloadUrl = await getDownloadURL(fileSnapshot.ref);
        return downloadUrl;
      })
    );

    const response = await User.findByIdAndUpdate(id, { img: imageUrls[0] });
    return res.json(response).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
