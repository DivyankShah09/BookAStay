/**
 * Auther: Shyamal Prajapati
 * Banner id: B00958501
 */

import { firebaseInitializeApp } from "../../config/firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Listing from "../../models/Listing.js";

export const uploadPhoto = async (req, res) => {
  try {
    const { id } = req.body;
    const listing = await Listing.findById(id);
    const img = req.files;
    console.log(req);
    const storage = getStorage(firebaseInitializeApp);
    const bucket = ref(storage, "images");
    const storageRef = ref(storage);

    let imageUrls = await Promise.all(
      img.map(async (imagePath) => {
        const fileSnapshot = await uploadBytesResumable(
          ref(storageRef, "images/" + imagePath.originalname),
          imagePath.buffer
        );
        const downloadUrl = await getDownloadURL(fileSnapshot.ref);
        return downloadUrl;
      })
    );
 
    const urls = listing.img ? listing.img.concat(imageUrls) : imageUrls;
    const response = await Listing.findByIdAndUpdate(id, { img: urls });
    return res.json(response).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
