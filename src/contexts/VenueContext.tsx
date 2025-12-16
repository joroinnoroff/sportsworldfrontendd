import { useState, createContext, type ReactNode, useEffect } from "react";
import { type IVenue } from "../interfaces/IVenue";
import type { IVenueContext } from "../interfaces/IVenueContext";
import VenueService from "../services/VenueService";
import type { IVenueSingelResponse, IDefaultResponse } from "../interfaces/ResponseInterfaces";

export const VenueContext = createContext<IVenueContext | null>(null);

interface Props { children: ReactNode }

export const VenueProvider = ({ children }: Props) => {

    const [venues, setVenues] = useState<IVenue[]>([]);
    const [idVenue, setIdVenue] = useState<IVenue | null>(null);
    const [capacityVenues, setCapacityVenues] = useState<IVenue[]>([]);

    const setVenuesFromService = async () => {
        const response = await VenueService.getAllVenues();
        if (response.success && response.data) {
            setVenues(response.data);
        } else {
            console.log(Error);
        }
    };

    useEffect(() => {
        setVenuesFromService();
    }, []);

    // Venue quantity
    const fetchVenueQuantity = (): number => {
        return venues.length;
    };

    // Søk venue på id
    const fetchVenueById = async (id: number): Promise<IVenueSingelResponse> => {
        const response = await VenueService.getVenueById(id);
        if (response.success && response.data) {
            setIdVenue(response.data);
            return {
                success: true,
                data: response.data
            };
        } else {
            console.log(Error);
            return {
                success: false,
                data: null
            };
        }
    };

    // Søk venue på capacity
    const fetchVenueByCapacity = async (capacity: number) => {
        const response = await VenueService.getVenueByCapacity(capacity);
        if (response.success && response.data) {
            setCapacityVenues(response.data);
        } else {
            console.log(Error);
        }
    }

    // PUT / Edit venue
    const putVenue = async (editedVenue: IVenue, image: File): Promise<IDefaultResponse> => {
        try {
            const response = await VenueService.putVenue(editedVenue, image);

            if (response.success && response.data) {
                setVenues(prev =>
                    prev.map(v =>
                        v.id === editedVenue.id ? response.data : v
                    )
                );
            }

            return response;

        } catch (error) {
            return { success: false };
        }
    };

    // DELETE
    // delete venue
    const deleteVenue = async (id: number): Promise<IDefaultResponse> => {
        const response = await VenueService.deleteVenue(id);
        if (response.success) {
            setVenues(prev => prev.filter(v => v.id !== id));
        }
        return response;
    }

    // POST
    const saveVenue = async (newVenue: IVenue, image: File): Promise<IDefaultResponse> => {
        const response = await VenueService.postVenue(newVenue, image);
        if (response.success === true && response.data != null) {
            const newVenueWithId: IVenue = response.data;
            setVenues(
                prev => [...prev, newVenueWithId]
            );
        }
        return response;
    }

    return (
        <VenueContext.Provider value={{
            venues,
            fetchVenueQuantity,
            fetchVenueById,
            idVenue,
            fetchVenueByCapacity,
            capacityVenues,
            saveVenue,
            putVenue,
            deleteVenue
        }}>
            {children}
        </VenueContext.Provider>
    );
}