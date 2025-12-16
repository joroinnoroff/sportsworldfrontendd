import React, { useRef, useContext, useState } from "react";
import { AthleteContext } from "../../contexts/AthleteContext";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import AthleteItem from "./AthleteItem";



const AthleteSearch = () => {

    const nameInput = useRef<HTMLInputElement | null>(null);
    //importere athletes fra context
    const { athletes } = useContext(AthleteContext) as IAthleteContext;
    const [searched, setSearched] = useState<string>("");


    //bruker athletes fra context og setter dem istedenfor å bruke db funksjon 
    const handleSearch = () => {
        if (nameInput.current?.value) {
            setSearched(nameInput.current.value);
        }
    };





    //Trenger ikke være async bare for ui
    const handleClear = () => {
        setSearched("")
        //nullstiller søkefelt 
        if (nameInput.current) nameInput.current.value = "";
    }
    //bruker det som alt er i contekst og søker etter dem istedenfor å bruke fetchbyname som vi gjør i venueSearch 
    //om ingenting er søkt er det et tomt array - athletes fra context med filter navn  
    const displayedAthletes = searched
        ? athletes.filter(a =>
            a.name.toLowerCase().includes(searched.toLowerCase())
        )
        : [];





    return (
        <section className="  p-3 ">


            <div className="flex flex-col gap-1 max-w-md">

                <label className="text-sm text-gray-600 sr-only">
                    Search athlete by name
                </label>
                <input
                    ref={nameInput}
                    type="text"
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name..."
                />
                <button
                    onClick={handleSearch}
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
                >
                    Search
                </button>
            </div>

            {/**Vises kun om man søker */}
            {searched && (
                <div className="mt-4 space-y-3">
                    <p>You have searched for: {searched} </p>

                    <button onClick={handleClear} className="px-4 py-2 flex gap-1 cursor-pointer rounded-md"><span className="text-xs rounded-full bg-black text-white h-4 w-4">X</span>Clear</button>
                    <p className="text-xs font-thin opacity-60 my-2">{displayedAthletes.length} {displayedAthletes.length > 1 ? "results" : "result"}</p>
                    <div className="grid grid-cols-2   xl:grid-cols-3 2xl:grid-cols-4">
                        {displayedAthletes.map((athlete, index) => (
                            <AthleteItem key={"athlete" + index} athlete={athlete} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );

}

export default AthleteSearch;