import React, { useRef, useContext, useState } from "react";
import { AthleteContext } from "../../contexts/AthleteContext";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import AthleteItem from "./AthleteItem";



const AthleteSearch = () => {

    const nameInput = useRef<HTMLInputElement | null>(null);
    //importere athletes fra context
    const { athletes, fetchAthleteByName } = useContext(AthleteContext) as IAthleteContext;
    const [searched, setSearched] = useState<string>("");


    //bruker athletes fra context og setter dem

    const handleSearch = () => {
        if (!nameInput.current?.value) return;

        const value = nameInput.current.value;
        setSearched(value);
        fetchAthleteByName(value);

        nameInput.current.value = "";
    };

    const handleClear = () => {
        setSearched("");
    };










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
                    <p>You have searched for: {searched}</p>

                    <button
                        onClick={handleClear}
                        className="px-4 py-2 flex gap-1 cursor-pointer rounded-md"
                    >
                        <span className="text-xs rounded-full bg-black text-white h-4 w-4 flex items-center justify-center">
                            X
                        </span>
                        Clear
                    </button>

                    <p className="text-xs opacity-60">
                        {athletes.length}{" "}
                        {athletes.length === 1 ? "result" : "results"}
                    </p>
                    {/**Har BRUKT athtles og ikke nameAhtletes da det blir en annen liste en den vi bruker igjennom applikasjon  */}
                    <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
                        {athletes.map((athlete, index) => (
                            <AthleteItem
                                key={`athlete-${athlete.id ?? index}`}
                                athlete={athlete}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );

}

export default AthleteSearch;