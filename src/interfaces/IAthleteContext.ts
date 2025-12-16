import type { IAthlete } from "./IAthlete";
import type { IDefaultResponse, IAthleteSingelResponse } from "./ResponseInterfaces";

export interface IAthleteContext {
    athletes: IAthlete[],
    fetchAthleteQuantity: () => number,
    fetchAthleteById: (id: number) => Promise<IAthleteSingelResponse>,
    idAthlete: IAthlete | null,


    saveAthlete: (athlete: IAthlete, image: File) => Promise<IDefaultResponse>,
    putAthlete: (updatedAthlete: IAthlete, image: File) => Promise<IDefaultResponse>,
    deleteAthelete: (id: number) => Promise<IDefaultResponse>,
    putPurchasedTrue: (purchasedAthlete: IAthlete) => Promise<IDefaultResponse>
}