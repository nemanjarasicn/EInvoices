import httpClient from "../http-common";

class AppService {
  public getLoggedSubject(id: number) {
    return httpClient.get<any>(`company/company/${id}`);
  }

  getCompaniesAll() {
    return httpClient.get<any>("company");
  }
}

export default new AppService();
