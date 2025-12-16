import VenueEdit from "../components/Venue/VenueEdit";
import VenueList from "../components/Venue/VenueList";
import VenueSearch from "../components/Venue/VenueSearch";

const VenuePage = () => {
    return (
        <>
            <div className="px-6  my-12">
                <h1 className="text-5xl font-bold my-4">Search for venues</h1>
                <VenueList />
                <VenueSearch />
                <VenueEdit />
            </div>
        </>
    );
}

export default VenuePage;