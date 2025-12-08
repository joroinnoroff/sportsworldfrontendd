import { useRef, useContext } from "react";
import { AthleteContext } from "../../contexts/AthleteContext";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import AthleteItem from "./AthleteItem";

const AthleteSearch = () => {

    const nameInput = useRef<HTMLInputElement | null>(null); 
    const {fetchAthleteByName, nameAthletes} = useContext(AthleteContext) as IAthleteContext;

    const handleSearch = async () => {
        if(nameInput.current && nameInput.current.value != ""){
            await fetchAthleteByName(nameInput.current.value)
            console.log("sender" + nameInput.current.value)
        }else{
            console.log(Error, "Error handeling search on name")
        }
    }

    const getAthleteJSX = () => {
        const athleteJSX = nameAthletes.map( (athlete, index) => {
            return(
                <AthleteItem
                    key={"athlete" + index}
                    athlete={athlete}
                />
            )
        }); 
        return athleteJSX;
    }

    return(
        <section>
            <div>
                <label>Search athlete on name</label>
                <input ref={nameInput} className="border" type="text" />
            </div>
            <button onClick={handleSearch} className="border">Search</button>
            <div>
                {getAthleteJSX()}
            </div>
        </section>
    );
}

export default AthleteSearch;