import { Link } from "react-router-dom";
import AthleteList from "../components/Athlete/AthleteList";
import { useContext } from "react";
import { FinanceContext } from "../contexts/FinanceContext";
import Numbers from "../components/finance/Numbers";
import { AthleteContext } from "../contexts/AthleteContext";
import type { IAthleteContext } from "../interfaces/IAthleteContext";

const DashboardPage = () => {
    const athleteContext = useContext(AthleteContext);

    if (!athleteContext) return <p>Loading athletes...</p>;

    //filtrer ut med kjøpstatus
    const purchasedAthletes = athleteContext.athletes.filter(a => a.purchaseStatus);

    return (
        <>
            <div className="  mx-auto py-6 px-12 min-h-screen w-full">
                <h1 className="text-5xl font-bold my-4">Dashboard page</h1>

                <div className="grid  ">

                    <div className="finance">
                        <div className="balance">
                            <Numbers />


                        </div>
                    </div>


                    <div className="athlests my-8">
                        <div className="container">
                            <h3>Fighters purchased: </h3>

                            {purchasedAthletes.length > 0 ? (
                                <AthleteList athletes={purchasedAthletes} />
                            ) : (
                                <p> no purchases</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;