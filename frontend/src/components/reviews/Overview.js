import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";

const Overview = ({ averageRating, ratingsCount, starCounts }) => {
    return (
        <div className=" w-full md:w-3/5">
            <div className="text-lg font-semibold text-gray-700">Overall Rating</div>
            <div className="text-3xl font-bold text-gray-700">{averageRating}/5</div>
            <div className="text-sm">Based on {ratingsCount} reviews</div>
            {Object.keys(starCounts)
                .sort((a, b) => b - a)
                .map((starRating) => (
                    <div className="my-1 flex items-center gap-x-4" key={starRating}>
                        <div className="flex w-8 items-center pr-2">
                            {starRating}{" "}
                            <FontAwesomeIcon icon={fasStar} className="ml-1 text-yellow-400" />
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-300">
                            <div
                                className="h-2.5 rounded-full bg-yellow-400"
                                style={{
                                    width: `${(starCounts[starRating] / ratingsCount) * 100}%`
                                }}
                            ></div>
                        </div>
                        <span>{starCounts[starRating]}</span>
                    </div>
                ))}
        </div>
    );
};

export default Overview;
