import { useRef, useContext, useState, type ChangeEvent } from "react";
import type { IVenue } from "../../interfaces/IVenue";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import { VenueContext } from "../../contexts/VenueContext";

const VenueEdit = () => {

    const { putVenue, fetchVenueById, idVenue } = useContext(VenueContext) as IVenueContext;

    const idInput = useRef<HTMLInputElement | null>(null);
    const nameInput = useRef<HTMLInputElement | null>(null);
    const capacityInput = useRef<HTMLInputElement | null>(null);

    const [image, setImage] = useState<File | null>(null);
    const [venueId, setVenueId] = useState(0);

    const getVenueById = async () => {
        if (idInput.current && idInput.current.value.trim() !== "") {
            const idParsed = Number(idInput.current.value);

            if (!isNaN(idParsed)) {
                const response = await fetchVenueById(idParsed);

                if (response.success && response.data) {
                    nameInput.current!.value = response.data.name;
                    capacityInput.current!.value =
                        response.data.capacity.toString();
                }
            }
        }
    }

    const changeNewImage = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    }

    const editVenue = async () => {
        if (
            idInput.current &&
            nameInput.current &&
            capacityInput.current
        ) {
            const editedVenue: IVenue = {
                id: Number(idInput.current.value),
                name: nameInput.current.value.trim(),
                capacity: Number(capacityInput.current.value),
                image: image ? image.name : idVenue?.image ?? ""
            };

            await putVenue(editedVenue, image!);

            // reset
            idInput.current.value = "0";
            nameInput.current.value = "";
            capacityInput.current.value = "";
            setImage(null);
        }
    }

    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setVenueId(value < 0 ? 0 : value);
    }

    return (
        <section className="my-52">
            <h3>Edit Venue</h3>

            <div>
                <label>Id:</label>
                <div>
                    <input
                        ref={idInput}
                        type="number"
                        value={venueId}
                        onChange={handleIdChange}
                        className="border"
                        placeholder="Assign ID"
                    />
                    <button onClick={getVenueById} className="border">
                        Search by id
                    </button>
                </div>

                <div>
                    <label>Name:</label>
                    <input
                        ref={nameInput}
                        type="text"
                        className="border"
                        placeholder="Venue name"
                    />
                </div>

                <div>
                    <label>Capacity:</label>
                    <input
                        ref={capacityInput}
                        type="number"
                        className="border"
                        placeholder="Venue capacity"
                    />
                </div>

                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        onChange={changeNewImage}
                        className="border"
                    />
                </div>
            </div>

            <button onClick={editVenue} className="border">
                Edit Venue
            </button>
        </section>
    );
};

export default VenueEdit;