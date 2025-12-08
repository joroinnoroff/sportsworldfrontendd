import { useRef, useContext } from "react";
import { AthleteContext } from "../../contexts/AthleteContext";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";

const AthleteEdit = () => {

    const { fetchAthleteById, idAthlete } = useContext(AthleteContext) as IAthleteContext;

    const idInput = useRef<HTMLInputElement | null>(null);
    const nameInput = useRef<HTMLInputElement | null>(null);
    const genderInput = useRef<HTMLInputElement | null>(null);
    const priceInput = useRef<HTMLInputElement | null>(null);
    // ImageUploader??
    const purchaseStatusInput = useRef<HTMLInputElement | null>(null);

    const getAthleteById = async () => {
    if (idInput.current && idInput.current.value.trim() !== "") {
        const idParsed = Number(idInput.current.value);
        if (!isNaN(idParsed)) {
            await fetchAthleteById(idParsed);

            if (idAthlete && nameInput.current && genderInput.current && priceInput.current && purchaseStatusInput.current) {
                nameInput.current.value = idAthlete.name;
                genderInput.current.value = idAthlete.gender;
                priceInput.current.value = idAthlete.price.toString();
                purchaseStatusInput.current.checked = idAthlete.purchaseStatus;
}
        } else {
            console.log("ID is not a number");
        }
    }
};

    const editAthlete = async () => {
        if (idInput.current &&
            nameInput.current &&
            genderInput.current &&
            priceInput.current &&
            purchaseStatusInput.current &&
            idInput.current.value.trim() !== "" &&
            nameInput.current.value.trim() !== "" &&
            genderInput.current.value.trim() !== "" &&
            priceInput.current.value.trim() !== "") {
            const id = Number(idInput.current.value);
            const name = nameInput.current.value.trim();
            const gender = genderInput.current.value.trim();
            const price = Number(priceInput.current.value);
            const purchaseStatus = purchaseStatusInput.current.checked;
            if (isNaN(id) || isNaN(price)) {
                console.log("Id, or price is not a number");
            } else {
                console.log("Please asign all inputfields")
            }
            const editedAthlete: IAthlete = {
                id: id,
                name: name,
                gender: gender,
                price: price,
                image: "",
                purchaseStatus: purchaseStatus,
            }
            

        }

    }

    return (
        <section>

            <button onClick={getAthleteById} className="border">
                Search on id
            </button>

            <h3>Edit Athlete</h3>
            <div>
                <label>Id: </label>
                <div>
                    <input
                        ref={idInput}
                        type="number"
                        className="border"
                        placeholder="Asign ID"
    
                    />
                </div>

                <div>
                    <label>Name: </label>
                    <div>
                        <input
                            ref={nameInput}
                            type="text"
                            className="border"
                            placeholder="Asign name"
                        />
                    </div>
                </div>

                <div>
                    <label>Gender: </label>
                    <div>
                        <input
                            ref={genderInput}
                            type="text"
                            className="border"
                            placeholder="Asign gender"
                        />
                    </div>
                </div>

                <div>
                    <label>Price: </label>
                    <div>
                        <input
                            ref={priceInput}
                            type="number"
                            className="border"
                            placeholder="Asign price"
                        />
                    </div>
                </div>

                <div>
                    <label>Purchased: </label>
                    <div>
                        <input
                            ref={purchaseStatusInput}
                            type="checkbox"
                            className="border"
                        />
                    </div>
                </div>
            </div>

            <button onClick={editAthlete} className="border">Edit</button>
        </section>
    );
}

export default AthleteEdit;