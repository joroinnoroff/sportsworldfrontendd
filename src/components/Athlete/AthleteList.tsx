import { useContext } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import AthleteItem from "./AthleteItem";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";

const AthleteList = () => {

    const { athletes } = useContext(AthleteContext) as IAthleteContext;

    const getAthleteJSX = () => {
        const athleteJSX = athletes.map((athlete, index) => {
            return (
                <AthleteItem
                    key={"athlete" + index}
                    athlete={athlete}
                />
            )
        });
        return athleteJSX;
    }

    return (
        <section className="col-span-6">
            <header>
                Athletes liste
            </header>
            {getAthleteJSX()}
        </section>
    );
}

export default AthleteList;