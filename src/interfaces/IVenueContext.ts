import type { IVenue } from "./IVenue";
import type { IDefaultResponse, IVenueSingelResponse } from "./ResponseInterfaces";

export interface IVenueContext {
    venues: IVenue[],
    fetchVenueQuantity: () => number,
    fetchVenueById: (id: number) => Promise<IVenueSingelResponse>,
    idVenue: IVenue | null,
    fetchVenueByCapacity: (capacity: number) => void,
    capacityVenues: IVenue[],
    saveVenue: (venue: IVenue, image: File) => Promise<IDefaultResponse>,
    putVenue: (updatedVenue: IVenue, image: File) => Promise<IDefaultResponse>,
    deleteVenue: (id: number) => Promise<IDefaultResponse>,
}
