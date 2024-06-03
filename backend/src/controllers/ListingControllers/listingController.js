/**
 * Auther: Shyamal Prajapati
 * Banner id: B00958501
 */

import Listing from "../../models/Listing.js";

export const createListing = async (req, res) => {
  const ownerId = req.userId;
  console.log("ownerId: ", ownerId);
  try {
    const {
      name,
      description,
      address,
      utilities,
      price,
      location,
      numberOfRooms,
      startDate,
      endDate,
    } = req.body;

    var convertedUtilities = utilities;
    if (typeof convertedUtilities === "string") {
      convertedUtilities = convertedUtilities
        .split(",")
        .map((item) => item.trim());
    }
    let listing = new Listing({
      owner: ownerId,
      name,
      description,
      price,
      address,
      utilities: convertedUtilities,
      location,
      numberOfRooms,
      startDate,
      endDate,
      img: null,
    });

    await listing.save();

    res.json(listing).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const getListings = async (req, res) => {
  try {
    console.log(req.userId);
    let listing = await Listing.find({ owner: req.userId });
    console.log(listing);
    res.json(listing).status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getListingById = async (req, res) => {
  try {
    const listingId = req.params.id;
    let listing = await Listing.findById(listingId);
    res.json(listing).status(200);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const deleteListing = async (req,res) => {
  const { id } = req.params;
  const response = await Listing.findByIdAndDelete(id);
  res.json(response);
}

export const updateListing = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    address,
    utilities,
    price,
    location,
    numberOfRooms,
    img,
    startDate,
    endDate,
  } = req.body;
  let listing = {};
  console.log(name);
  if (name) listing.name = req.body.name;
  if (address) listing.address = req.body.address;
  if (description) listing.description = req.body.description;
  if (utilities) listing.utilities = req.body.utilities;
  if (price) listing.price = req.body.price;
  if (numberOfRooms) listing.numberOfRooms = req.body.numberOfRooms;
  if (location) listing.location = req.body.location;
  if (img) listing.img = req.body.img;
  if (startDate) listing.startDate = req.body.startDate;
  if (endDate) listing.endDate = req.body.endDate;

  try {
    const result = await Listing.findByIdAndUpdate(id, listing, { new: true });
    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: "User updated successfully", user: result }).status(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
