import axios from "axios";
import { KPSessionCreationResponse, KPCredentials } from "@cs/training-be/src/types/klarnaPayments";

export const getSession = async (credentials: KPCredentials): Promise<KPSessionCreationResponse["data"] | void> => {
  try {
    const res = await axios.post("/kp/session", credentials && { credentials })
    const { data } : KPSessionCreationResponse = res;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
