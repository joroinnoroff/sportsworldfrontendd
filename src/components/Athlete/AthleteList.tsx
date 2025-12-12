import { useContext } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import AthleteItem from "./AthleteItem";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";
//Mulighet for å sende item fra side med context- eksempel dashbord
interface AthleteListProps {
    athletes?: IAthlete[]; // optional
}

const AthleteList = ({ athletes: propAthletes }: AthleteListProps) => {

    const { athletes: contextAthletes } = useContext(AthleteContext) as IAthleteContext;

    // If propAthletes exists → use it
    // Else → use all athletes from context
    const finalAthletes = propAthletes ?? contextAthletes;

    return (
        <section className="min-w-full   min-h-full grid grid-cols-2   xl:grid-cols-3 2xl:grid-cols-4">


            {finalAthletes.map((athlete, index) => (
                <AthleteItem key={"athlete" + index} athlete={athlete} />
            ))}
        </section>
    );
}

export default AthleteList;
