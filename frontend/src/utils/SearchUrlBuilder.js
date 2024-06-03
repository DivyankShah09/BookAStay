/**
 * Name: Aman Harishkumar Desai
 * Banner ID: B00965752
 */
export const urlBuilder = (baseUrl, startDate, endDate, searchText, loc, location, sort, selectedAmenities, selectedRating) => {
    let filterDataApi = `${baseUrl}/api/listings/search?startDate=${startDate}&endDate=${endDate}`;

    if (searchText) {
        filterDataApi += "&search=" + searchText;
    }

    if (loc) {
        console.log("Location from function:", loc);
        filterDataApi += "&location=" + loc;
    } else if (location) {
        console.log("Location from state:", location);
        filterDataApi += "&location=" + location;
    }

    if (sort) {
        filterDataApi += "&sort=" + sort;
    }

    if (selectedAmenities.length > 0) {
        filterDataApi += "&selectedUtilities=" + selectedAmenities.join(",");
    }

    if (selectedRating.length > 0) {
        filterDataApi += "&selectedRating=" + selectedRating.join(",");
    }

    return filterDataApi;
};