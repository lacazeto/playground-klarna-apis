import { AxiosResponse } from "axios";

export interface KPCredentials {
  username: string;
  password: string;
}

export interface KPSessionCreationResponse extends AxiosResponse {
  data: {
    session_id: string;
    client_token: string;
    payment_method_categories: {
      asset_urls: {[key: string]: string;};
      identifier: string;
      name: string
    }[]
  }
}

export type PaymentMethods = Pick<Pick<KPSessionCreationResponse, "data">["data"], "payment_method_categories">["payment_method_categories"];
