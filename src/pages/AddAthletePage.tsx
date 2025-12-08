import AthleteList from "../components/Athlete/AthleteList";
import NewAthlete from "../components/Athlete/AthleteNew";

const AddAthletePage = () => {
    return(
        <>
            <h1>Add athlete page</h1>
            <NewAthlete/>
            <AthleteList/>
        </>
    );
}

export default AddAthletePage;