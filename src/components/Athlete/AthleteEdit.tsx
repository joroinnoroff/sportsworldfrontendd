import { useRef, useContext, useState, type ChangeEvent } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";

const AthleteEdit = () => {
    const { putAthlete, fetchAthleteById, idAthlete } = useContext(
        AthleteContext
    ) as IAthleteContext;

    const idInput = useRef<HTMLInputElement | null>(null);
    const nameInput = useRef<HTMLInputElement | null>(null);
    const genderInput = useRef<HTMLSelectElement | null>(null);
    const priceInput = useRef<HTMLInputElement | null>(null);

    const [statusMessage, setStatusMessage] = useState<string>("");

    // ImageUploader??
    const [image, setImage] = useState<File | null>(null);

    const purchaseStatusInput = useRef<HTMLInputElement | null>(null);
    const [latestFetchedAthlete, setLatestFetchedAthlete] =
        useState<IAthlete | null>(null);
    let [athletes, setAthletes] = useState(0);

    const restorBackAthlete = () => {
        if (latestFetchedAthlete) {
            idInput.current!.value = "0";
            nameInput.current!.value = latestFetchedAthlete.name;
            genderInput.current!.value = latestFetchedAthlete.gender;
            priceInput.current!.value = String(latestFetchedAthlete.price);
            purchaseStatusInput.current!.checked =
                latestFetchedAthlete.purchaseStatus;
        }
    };

    const getAthleteById = async () => {
        if (idInput.current && idInput.current.value.trim() !== "") {
            const idParsed = Number(idInput.current.value);
            if (!isNaN(idParsed)) {
                //const response = await AthleteService.getAthleteById(idParsed);
                const response = await fetchAthleteById(idParsed);
                idInput.current.value = ""
                if (response.success) {
                    if (
                        idInput.current != null &&
                        nameInput.current != null &&
                        genderInput.current != null &&
                        priceInput.current != null &&
                        purchaseStatusInput.current != null
                    ) {
                        setLatestFetchedAthlete(response.data);
                        nameInput.current.value = response.data?.name || "";
                        genderInput.current.value = response.data?.gender || "";
                        priceInput.current.value = String(response.data?.price) || "0";
                        purchaseStatusInput.current!.checked =
                            response.data?.purchaseStatus ?? false;

                        console.log(latestFetchedAthlete);
                        idInput.current.value = ""
                    }
                } else {
                    setStatusMessage("ID finnes ikke");
                }
            }
        }
    };

    const changeNewImage = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files != null) {
            setImage(files[0]);
            console.log(files[0]);
        }
    };

    const editAthlete = async () => {
        if (
            idInput.current &&
            nameInput.current &&
            genderInput.current &&
            priceInput.current &&
            purchaseStatusInput.current
        ) {

            if (genderInput.current.value == "")
                return [setStatusMessage("Velg kjønn"), restorBackAthlete()];
            if (nameInput.current.value == "".trim())
                return [setStatusMessage("Fyll inn navn"), restorBackAthlete()];
            if (priceInput.current.value == "".trim()) {
                return [setStatusMessage("Fyll inn et tall"), restorBackAthlete()];
            }

            const id = Number(idInput.current.value.trim());
            const name = nameInput.current.value.trim();
            const gender = genderInput.current.value.trim();
            const price = Number(priceInput.current.value);
            const purchaseStatus = purchaseStatusInput.current.checked;

            const editedAthlete: IAthlete = {
                id: id,
                name: name,
                gender: gender,
                price: price,
                image: image ? image.name : idAthlete?.image ?? "",
                purchaseStatus: purchaseStatus,
            };

            await putAthlete(editedAthlete, image!);

            idInput.current.value = "0";
            nameInput.current.value = "";
            genderInput.current.value = "";
            priceInput.current.value = "";
            purchaseStatusInput.current.checked = false;

            setStatusMessage("Redigering fullført");
        } else {
            setStatusMessage("Alle Feltene må fylles inn");
        }
    };

    const countAthletes = (e: ChangeEvent<HTMLInputElement>) => {
        let countHandel = Number(e.target.value);
        if (countHandel < 0) {
            countHandel = 0;
        }
        setAthletes(countHandel);
    };

    setTimeout(() => {
        setStatusMessage("");
    }, 3000);

    return (
        <section id="edit">
            <h3 className="text-5xl font-bold my-4">Edit an athlete</h3>

            <div className="max-w-lg">
                <label>Search by id</label>
                <div className="my-2">
                    <input
                        ref={idInput}
                        type="number"
                        onChange={countAthletes}
                        value={athletes}
                        className="w-full p-1 border hover:opacity-70 transition cursor-pointer "
                        placeholder="Asign ID"
                    />
                    <button onClick={getAthleteById} className="border">
                        Search on id
                    </button>
                </div>

                <div className="my-2">
                    <label>Name: </label>
                    <div>
                        <input
                            ref={nameInput}
                            type="text"
                            className="w-full p-1 border hover:opacity-70 transition cursor-pointer "
                            placeholder="Asign name"
                        />
                    </div>
                </div>

                <div className="my-2">
                    <label htmlFor="gender-selectin">Gender: </label>
                    <div>
                        <select id="gender-selectin" ref={genderInput}>
                            <option value="">select gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label>Price: </label>
                    <div className="">
                        <input
                            ref={priceInput}
                            type="number"
                            className="w-full p-1 border hover:opacity-70 transition cursor-pointer "
                            placeholder="Asign price"
                        />
                    </div>
                </div>
                <div className="my-4">
                    <label>Image</label>
                    <input onChange={changeNewImage} className="border" type="file" />
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

            <button onClick={editAthlete} className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium">
                Edit
            </button>
            <p>{statusMessage}</p>
        </section>
    );
};

export default AthleteEdit;