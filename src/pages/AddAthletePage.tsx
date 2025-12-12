import AthleteList from "../components/Athlete/AthleteList";
import NewAthlete from "../components/Athlete/AthleteNew";

const AddAthletePage = () => {
    return (
        <>
            <div className="px-6 py-12">
                <h1>Add athlete page</h1>
                <NewAthlete />
                <AthleteList />
            </div>
        </>
    );
}

export default AddAthletePage;