import { useState, createContext, type ReactNode, useEffect } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import type { IAthleteContext } from "../interfaces/IAthleteContext";
import AthleteService from "../services/AthleteService";

export const AthleteContext = createContext<IAthleteContext | null>(null);

interface Props {children: ReactNode}

export const AthleteProvider = ({children} : Props) => {

    const [athletes, setAthletes] = useState<IAthlete[]>([]);
    const [idAthlete, setIdAthlete] = useState<IAthlete | null>(null);
    const [nameAthletes, setNameAthletes] = useState<IAthlete[]>([]);

    const setAthletesFromService = async () => {
        const response = await AthleteService.getAllAthletes();
        if(response.success && response.data){
            setAthletes(response.data);
        }else{
            console.log(Error)
        }
    }

    useEffect(()=>{
        setAthletesFromService();
    }, [])

    // Athlete quantity
    const fetchAthleteQuantity = () : number => {
        return athletes.length;
    }

    // Søk athlete på id
    const fetchAthleteById = async (id: number) => {
        const response = await AthleteService.getAthleteById(id);
        if(response.success && response.data){
            setIdAthlete(response.data);
        }else{
            console.log(Error)
        }
    }

    // Søk athlete på name 
    const fetchAthleteByName = async (name: string) => {
        const response = await AthleteService.getAthleteByName(name);
        if(response.success && response.data){
            setNameAthletes(response.data);
        }else{
            console.log(Error)
        }
    }

    // TODO: Put/edit athlete


    return(
        // Sjekk IAthleteContex
        // Husk å wrap Provider i AppRouting til pages som skal ha tilgang
        <AthleteContext.Provider value={{athletes, fetchAthleteQuantity, fetchAthleteById, idAthlete, fetchAthleteByName, nameAthletes}}>
            {children}
        </AthleteContext.Provider>
    );
}