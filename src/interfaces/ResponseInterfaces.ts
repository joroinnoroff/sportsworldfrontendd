import type { IAthlete } from "./IAthlete";

export interface IDefaultResponse {
    success: boolean
}

export interface IAthleteSingelResponse {
    success: boolean,
    data: IAthlete | null
}

export interface IAthleteResponse {
    success: boolean,
    data: IAthlete[] | null
}