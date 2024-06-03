/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import ServiceProvider from "../../models/ServiceProvider.js";
const GetServiceProfile = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.userId);
        console.log("Service Provider: ", serviceProvider);

        if (!serviceProvider) {
            return res.status(404).json({ message: 'Service Provider not found' });
        }
        res.json(serviceProvider);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log("Error: ", error);
    }
}

export const getServiceProviderById = async (req, res) => {
  try {
    console.log(req.params);
    const serviceProvider = await ServiceProvider.findById(req.params.id);
    if (!serviceProvider) {
      return res.status(404).json({ message: "Service Provider not found" });
    }
    res.json(serviceProvider);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export default GetServiceProfile