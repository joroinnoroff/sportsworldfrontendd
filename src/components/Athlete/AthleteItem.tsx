import { type IAthlete } from "../../interfaces/IAthlete";

const AthleteItem = ({athlete}:{athlete: IAthlete}) => {

    const editAthlete = () => {
        console.log("edit athlete button")
    }

    return(
        <article className="bg-white shadow-md rounded-xl p-4">
            <h3>{athlete.id}</h3>
            <h3>{athlete.name}</h3>
            <h3>{athlete.gender}</h3>
            <h3>{athlete.price}</h3>
            <img 
                src={athlete.image} 
                alt={athlete.name} 
            />
            <h3>{athlete.purchaseStatus}</h3>
        </article>
    );
}

export default AthleteItem;