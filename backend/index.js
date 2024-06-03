import express from "express";
import connectDB from "./src/config/database.js";
import adminRouter from "./src/routes/admin.js";
import authRoutes from "./src/routes/authentication.js";
import listingRoutes from "./src/routes/listingRoute.js";
import checkoutRoutes from "./src/routes/checkout.js";
import cors from "cors";
import dotenv from "dotenv";
import { verifyToken } from "./src/middleware/authMiddleware.js";
import router from "./src/routes/userRoutes.js";
import serviceRouter from "./src/routes/serviceProviderRoutes.js";
import { Roles } from "./src/enums/RoleEnum.js";
import uploadPhotoRoute from "./src/routes/uploadPhotoRoute.js";

const app = express();
app.use(cors());

import uploadListingPhotoRoutes from "./src/routes/uploadPhotoRoute.js";
import listingUploadPhotoRoute from "./src/routes/listingUploadPhoto.js";
dotenv.config();

connectDB();
dotenv.config();
app.use(express.json({ limit: "200mb", extended: false }));

app.get("/", (req, res) => {
  res.send("Backend server running.");
});
app.use("/api", router);
app.use("/api", uploadPhotoRoute);
app.use("/api", serviceRouter);
app.use("/api/admin", verifyToken(Roles.ADMIN), adminRouter);
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api", verifyToken(Roles.USER), checkoutRoutes);
app.use("/api/listing", listingUploadPhotoRoute);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
