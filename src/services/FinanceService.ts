import axios from "axios";
import type { IFinance } from "../interfaces/IFinance";
import type { IFinanceResponse } from "../interfaces/ResponseInterfaces";



const endpoint = "http://localhost:5279/api/finance"
const getFinance = async (): Promise<IFinanceResponse> => {
  try {
    const response = await axios.get(endpoint)
    return {
      success: true, data: response.data
    };
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}


//putFinance 
const updateFinance = async (updateFinance: IFinance): Promise<IFinanceResponse> => {
  try {
    await axios.put(endpoint, updateFinance);
    return {
      success: true,
      data: updateFinance
    }
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}


export default {
  getFinance,
  updateFinance
}