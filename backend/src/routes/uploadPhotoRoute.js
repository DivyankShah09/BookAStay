/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import express from 'express'
import multer from 'multer'
import { uploadServiceImage } from '../controllers/serviceProviderControllers/serviceImageController.js'
import { uploadUserImage } from '../controllers/userControllers/userImageController.js'

const uploadPhotoRoute = express.Router()
const upload = multer()
uploadPhotoRoute.post("/upload-service-photo", upload.array("files"), uploadServiceImage)
uploadPhotoRoute.post("/upload-user-photo", upload.array("files"), uploadUserImage)

export default uploadPhotoRoute