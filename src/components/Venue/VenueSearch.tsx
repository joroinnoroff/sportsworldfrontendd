import { useRef, useContext } from "react";
import { VenueContext } from "../../contexts/VenueContext";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import VenueItem from "./VenueItem";

const VenueSearch = () => {

    const capacityInput = useRef<HTMLInputElement | null>(null);
    const { fetchVenueByCapacity, capacityVenues } =
        useContext(VenueContext) as IVenueContext;

    const handleSearch = async () => {
        if (capacityInput.current && capacityInput.current.value !== "") {
            const capacity = Number(capacityInput.current.value);

            if (!isNaN(capacity)) {
                await fetchVenueByCapacity(capacity);
                console.log("sender capacity:", capacity);
            }
        } else {
            console.log("Error handling search on venue capacity");
        }
    };

    const getVenueJSX = () => {
        return capacityVenues.map((venue, index) => (
            <VenueItem
                key={"venue" + index}
                venue={venue}
            />
        ));
    };

    return (
        <section className="bg-white rounded-lg shadow p-6 max-w-md space-y-5 col-span-12 md:col-span-6">
            <h2 className="text-xl font-semibold text-gray-800">
                Search Venue by Capacity
            </h2>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">
                    Minimum capacity
                </label>
                <input
                    ref={capacityInput}
                    type="number"
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter capacity..."
                />
            </div>

            <button
                onClick={handleSearch}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
            >
                Search
            </button>

            <div className="mt-4 space-y-3">
                {getVenueJSX()}
            </div>
        </section>
    );
};

export default VenueSearch;