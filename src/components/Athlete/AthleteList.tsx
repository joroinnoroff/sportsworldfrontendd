import { useContext } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import AthleteItem from "./AthleteItem";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";
//Mulighet for å sende item fra side med context- eksempel dashbord
interface AthleteListProps {
    athletes?: IAthlete[];
}

const AthleteList = ({ athletes: propAthletes }: AthleteListProps) => {

    const { athletes: contextAthletes } = useContext(AthleteContext) as IAthleteContext;

    //bruker props athletes eller context 
    const finalAthletes = propAthletes ?? contextAthletes;

    return (
        <section className="min-w-full   min-h-full ">


            <div className="grid grid-cols-2   xl:grid-cols-3 2xl:grid-cols-4 items-center">
                {finalAthletes.map((athlete, index) => (
                    <AthleteItem key={"athlete" + index} athlete={athlete} />
                ))}
            </div>
        </section>
    );
}

export default AthleteList;
