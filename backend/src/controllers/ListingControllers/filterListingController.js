/**
 * Name: Aman Harishkumar Desai
 * Banner ID: B00965752
 */
import Listing from "../../models/Listing.js";

const sortingOptions = {
    "priceAsc": { price: 1 },
    "priceDesc": { price: -1 },
    "ratingAsc": { rating: 1 },
    "ratingDesc": { rating: -1 }
};

const searchQuery = (searchText, location, selectedUtilities, startDate, endDate, numberOfRooms, sort, ratings) => {
    // Pipeline stages for the aggregation query
    const pipeline = [];

    if (searchText) {
        const searchTextMatch = {
            $search: {
                index: 'defaultcomplete',
                autocomplete: {
                    query: searchText,
                    path: "name"
                }
            }
        };
        pipeline.push(searchTextMatch);
    } else {
        // get all documents
        pipeline.push({ $match: {} });
    }
    // Check if location is provided
    if (location) {
        const locationMatch = { location: { $regex: location, $options: "i" } };
        pipeline.push({ $match: locationMatch });
    }

    // Check if ratings are provided
    if (ratings && ratings.length) {
        const ratingConditions = ratings.map(rating => {
            // For each rating, we create two conditions:
            // One for ratings >= rating and < rating+1
            // Another specifically for integer ratings to include them directly
            return [
                { rating: { $gte: rating, $lt: rating + 1 } },
                { rating: rating }
            ];
        }).flat(); // Flatten the array of conditions into a single array

        // If there are any rating conditions, add them to the pipeline
        if (ratingConditions.length > 0) {
            pipeline.push({ $match: { $or: ratingConditions } });
        }
    }

    // Check if selectedUtilities is provided and not empty
    if (selectedUtilities && selectedUtilities.length > 0) {
        const utilitiesMatch = { utilities: { $in: selectedUtilities } };
        pipeline.push({ $match: utilitiesMatch });
    }

    // Check if startDate and endDate are provided
    if (startDate && endDate) {
        // only return listings that are available between or on the start and end dates.
        // Both dates are present in Listing document
        const dateMatch = {
            $match: {
                $and: [
                    { startDate: { $lte: new Date(startDate) } },
                    { endDate: { $gte: new Date(endDate) } }
                ]
            }
        };
        pipeline.push(dateMatch);
    }

    // Sort the results based on the selected sorting option
    if (sort) {
        const sortStage = { $sort: sortingOptions[sort] };
        pipeline.push(sortStage);
    }
    // Execute the aggregation query
    return Listing.aggregate(pipeline);
};

export const getSearch = async (req, res) => {
    const { search, location, selectedUtilities, startDate, endDate, numberOfRooms, sort, selectedRating } = req.query;
    const utilities = selectedUtilities ? selectedUtilities.split(",") : [];
    const ratings = selectedRating ? selectedRating.split(",") : [];

    //convert ratings to decimal
    ratings.forEach((rating, index) => {
        ratings[index] = parseFloat(rating);
    });

    try {
        console.log("Sort:", sort);

        const searchResults = await searchQuery(search, location, utilities, startDate, endDate, numberOfRooms, sort, ratings);
        res.status(200).json({
            message: "Success",
            data: searchResults
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}
