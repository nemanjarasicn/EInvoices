export interface User {
  token: string;
  type: string;
  username: string;
  authorities: { authority: string }[];
  companyId: number[];
}

export interface UserCompany {
  companyName: string;
  idCompany: number;
  id: number;
  pib: string;
  uuid: string | null;
  objectUuid: string | null;
  apiKey: string | null;
  mb: number | string;
  address: string;
  zip: string;
  city: string;
  country: string;
}

export interface Credentials {
  username: string;
  password: string;
}
