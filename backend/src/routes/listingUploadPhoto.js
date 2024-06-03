import { uploadPhoto } from "../controllers/uploadPhotoController/uploadPhotoController.js";
import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/authMiddleware.js";
import { Roles } from "../enums/RoleEnum.js";

const listingUploadPhotoRoute = express.Router();
const upload = multer();
listingUploadPhotoRoute.post(
  "/upload-photo",
  upload.array("files"),
  uploadPhoto
);

export default listingUploadPhotoRoute;
