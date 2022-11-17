import { Credentials } from "./core.models";
import authHttpClient from "./http-auth";

class AuthService {
  public login(credentials: Credentials) {
    return authHttpClient.post<any>("auth/login", credentials);
  }
}

export default new AuthService();
