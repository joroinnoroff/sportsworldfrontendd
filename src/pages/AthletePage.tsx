import { useContext } from "react";
import AthleteEdit from "../components/Athlete/AthleteEdit";
import AthleteList from "../components/Athlete/AthleteList";
import AthleteSearch from "../components/Athlete/AthleteSearch";

import type { IFinanceContext } from "../interfaces/IFinanceContext";
import { FinanceContext } from "../contexts/FinanceContext";

const AthletePage = () => {

    const financeContext = useContext(FinanceContext) as IFinanceContext;

    if (!financeContext) return <p>Loading finance...</p>;

    const { finance } = financeContext;
    return (
        <>
            <div className="px-6  my-12">


                <h1 className="text-5xl font-bold my-4">Search for fighters</h1>

                <AthleteSearch />
                <hr className="my-12 text-gray-300" />
                <h3 className="text-5xl font-bold my-4">All fighters</h3>
                <p className="font-thin opacity-70 mt-4">Your balance: {finance?.moneyLeft}kr</p>
                <AthleteList />

                <hr className="my-12 text-gray-300" />
                <AthleteEdit />

            </div>
        </>
    );
}

export default AthletePage;
