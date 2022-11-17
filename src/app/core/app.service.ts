import httpClient from "../http-common";

class AppService {
  public getLoggedSubject(id: number) {
    return httpClient.get<any>(`company/company/${id}`);
  }
}

export default new AppService();
