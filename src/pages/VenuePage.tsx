import VenueEdit from "../components/Venue/VenueEdit";
import VenueList from "../components/Venue/VenueList";
import VenueSearch from "../components/Venue/VenueSearch";

const VenuePage = () => {
    return (
        <>
            <h1>Show all venues page</h1>
            <VenueList />
            <VenueSearch/>
            <VenueEdit/>
        </>
    );
}

export default VenuePage;