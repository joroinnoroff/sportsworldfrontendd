import { useContext } from "react";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";

const AthleteQuantity = () => {
    const {fetchAthleteQuantity} = useContext(AthleteContext) as IAthleteContext;
    return(
        <article>
            <p>Antall athletes: {fetchAthleteQuantity()}</p>
        </article>
    );
}

export default AthleteQuantity;