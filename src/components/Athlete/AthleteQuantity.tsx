import { useContext } from "react";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";

const AthleteQuantity = () => {
    const { fetchAthleteQuantity } = useContext(AthleteContext) as IAthleteContext;
    return (
        <article className="bg-white rounded-lg shadow p-4 inline-block">
            <p className="text-sm text-gray-600">
                Antall athletes:{" "}
                <span className="font-semibold text-gray-900">
                    {fetchAthleteQuantity()}
                </span>
            </p>
        </article>
    );
}

export default AthleteQuantity;