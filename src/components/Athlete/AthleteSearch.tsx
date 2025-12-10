import { useRef, useContext } from "react";
import { AthleteContext } from "../../contexts/AthleteContext";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import AthleteItem from "./AthleteItem";

const AthleteSearch = () => {

    const nameInput = useRef<HTMLInputElement | null>(null);
    const { fetchAthleteByName, nameAthletes } = useContext(AthleteContext) as IAthleteContext;

    const handleSearch = async () => {
        if (nameInput.current && nameInput.current.value != "") {
            await fetchAthleteByName(nameInput.current.value)
            console.log("sender" + nameInput.current.value)
        } else {
            console.log(Error, "Error handeling search on name")
        }
    }

    const getAthleteJSX = () => {
        const athleteJSX = nameAthletes.map((athlete, index) => {
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
        <section className="bg-white rounded-lg shadow p-6 max-w-md space-y-5 col-span-12 md:col-span-6">
            <h2 className="text-xl font-semibold text-gray-800">
                Search Athlete
            </h2>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">
                    Search athlete by name
                </label>
                <input
                    ref={nameInput}
                    type="text"
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name..."
                />
            </div>

            <button
                onClick={handleSearch}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
            >
                Search
            </button>

            <div className="mt-4 space-y-3">
                {getAthleteJSX()}
            </div>
        </section>
    );

}

export default AthleteSearch;