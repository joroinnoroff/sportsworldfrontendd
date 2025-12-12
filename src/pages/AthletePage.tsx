import AthleteEdit from "../components/Athlete/AthleteEdit";
import AthleteList from "../components/Athlete/AthleteList";
import AthleteSearch from "../components/Athlete/AthleteSearch";

const AthletePage = () => {
    return (
        <>
            <div className="px-6 py-12">
                <h1>athletes page</h1>
                <div className="">
                    <AthleteSearch />
                    <AthleteList />
                    <AthleteEdit />
                </div>
            </div>
        </>
    );
}

export default AthletePage;
