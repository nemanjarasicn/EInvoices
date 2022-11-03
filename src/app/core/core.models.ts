export interface User {
  token: string;
  type: string;
  username: string;
  authorities: { authority: string }[];
  companyId: number;
}
