/**
 * Name: Nikunj Lalitkumar Hudka
 * Banner ID: B00959783
 */
import jwt from "jsonwebtoken";

export const verifyToken = (userType) => (req, res, next) => {
  console.log("authMiddleware", userType);
  console.log(req.header("Authorization"));
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "secretKey");
    console.log("Decoded: ", decoded);
    if (!userType.includes(decoded.user.userType.toLowerCase().toString())) {
      return res.status(401).json({ error: "Unauthorized user type" });
    }
    req.userId = decoded.user.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};
