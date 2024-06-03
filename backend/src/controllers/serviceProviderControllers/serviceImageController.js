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
import ServiceProvider from "../../models/ServiceProvider.js";

export const uploadServiceImage = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Service ID: ", id);
    const img = req.files;
    console.log("Service Image: ", img);
    const storage = getStorage(firebaseInitializeApp);
    const bucket = ref(storage, "images");
    const storageRef = ref(storage);

    const imageUrls = await Promise.all(
      img.map(async (imagePath) => {
        const fileSnapshot = await uploadBytesResumable(
          ref(storageRef, "images/" + imagePath.originalname),
          imagePath.buffer
        );
        const downloadUrl = await getDownloadURL(fileSnapshot.ref);
        console.log("Download URL from backend: ", downloadUrl);
        return downloadUrl;
      })
    );
    console.log("Image URLs: ", imageUrls);
    const response = await ServiceProvider.findByIdAndUpdate(id, { businessLogo: imageUrls[0] });
    console.log("Service Response: ", response);

    // const responseObject = {
    //     data: {
    //       url: imageUrls[0] // Assuming you want to return the first image URL
    //     }
    //   };
  
    //   return res.status(200).json(responseObject);
    return res.json(response).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
