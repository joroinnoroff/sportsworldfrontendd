import VenueList from "../components/Venue/VenueList";
import VenueNew from "../components/Venue/VenueNew";

const AddVenuePage = () => {
    return (
        <>
            <div className="px-6  my-12">
                <h1 className="text-5xl font-bold my-4">Create maps for your fighters</h1>

                <VenueNew />
                <VenueList />
            </div>
        </>
    );
}

export default AddVenuePage;