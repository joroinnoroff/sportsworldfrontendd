import AthleteEdit from "../components/Athlete/AthleteEdit";
import AthleteList from "../components/Athlete/AthleteList";
import AthleteSearch from "../components/Athlete/AthleteSearch";

const AthletePage = () => {
    return (
        <>
            <h1>athletes page</h1>
            <div className="grid grid-cols-12 gap-4">
                <AthleteSearch/>
                <AthleteList/>
                <AthleteEdit/>
            </div>
        </>
    );
}

export default AthletePage;
