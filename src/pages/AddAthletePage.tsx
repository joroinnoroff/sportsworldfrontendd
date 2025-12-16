import AthleteList from "../components/Athlete/AthleteList";
import NewAthlete from "../components/Athlete/AthleteNew";

const AddAthletePage = () => {
    return (
        <>
            <div className="px-6  my-12">
                <h1 className="text-5xl font-bold my-4">Create your fighters</h1>

                <NewAthlete />
                <AthleteList />
            </div>
        </>
    );
}

export default AddAthletePage;