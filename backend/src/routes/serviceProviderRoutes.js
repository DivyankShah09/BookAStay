/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import express from 'express';
import cors from 'cors';
import CreateServiceProfile from '../controllers/serviceProviderControllers/CreateServiceProfile.js';
import { verifyToken } from "../middleware/authMiddleware.js"
import GetServiceProfile, {
  getServiceProviderById,
} from "../controllers/serviceProviderControllers/GetServiceProfile.js";
import UpdateServiceProfile from '../controllers/serviceProviderControllers/UpdateServiceProfile.js';
import { Roles } from '../enums/RoleEnum.js';
const serviceRouter = express.Router();

serviceRouter.use(cors())

serviceRouter.post('/createServiceProfile', verifyToken(Roles.SERVICE_PROVIDER), CreateServiceProfile)
serviceRouter.get('/getServiceProfile', verifyToken(Roles.SERVICE_PROVIDER), GetServiceProfile)
serviceRouter.put('/updateServiceProfile/:id', verifyToken(Roles.SERVICE_PROVIDER), UpdateServiceProfile)
serviceRouter.get(
  "/getServiceProvider/:id",
  getServiceProviderById
);
// router.get('/getUserProfile', GetUserProfile)

export default serviceRouter