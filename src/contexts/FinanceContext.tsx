import { createContext, useEffect, useState, type ReactNode } from "react";
import type { IFinance } from "../interfaces/IFinance";
import type { IFinanceContext } from "../interfaces/IFinanceContext";
import FinanceService from "../services/FinanceService";

export const FinanceContext = createContext<IFinanceContext | null>(null);
interface Props { children: ReactNode }
export const FinanceProvider = ({ children }: Props) => {
    const [finance, setFinance] = useState<IFinance | null>(null
    );

    //getFinance  med bruk av service - egen tabell i db 
    const fetchFinance = async () => {
        const response = await FinanceService.getFinance();
        if (response.success && response.data) {
            setFinance(response.data);
            return response.data
        }
        return null;
    };

    //henter finance ved start 
    useEffect(() => {
        const loadFinance = async () => {
            console.log("Fetching finance...");
            const data = await fetchFinance();
            console.log("Finance fetched:", data);
        };
        loadFinance();
    }, []);

    //oppdaterer finance med bruk av interface som matcher felter i db med en PUT i service
    // da vi sender med status false eller true i frontend så kan denne gjenbrukes til både kjøp og salg av athlete
    const updateFinance = async (updateFinance: IFinance) => {
        const response = await FinanceService.updateFinance(updateFinance)
        if (response.success && response.data) {
            setFinance(response.data)
            return response.data
        }
        return null;
    };


    return <FinanceContext.Provider value={{
        finance,
        fetchFinance,
        updateFinance
    }}>
        {children}
    </FinanceContext.Provider>


}
