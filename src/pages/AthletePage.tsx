import AthleteEdit from "../components/Athlete/AthleteEdit";
import AthleteList from "../components/Athlete/AthleteList";
import AthleteQuantity from "../components/Athlete/AthleteQuantity";
import AthleteSearch from "../components/Athlete/AthleteSearch";

const AthletePage = () => {
    return(
        <>
        <h1>athletes page</h1>
            <div className="grid grid-cols-12 gap-4">
                <AthleteEdit/>
            </div>
        </>
    );
}

export default AthletePage;