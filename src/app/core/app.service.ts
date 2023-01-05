import httpClient from "../http-common";

class AppService {
  public getLoggedSubject(id: number) {
    return httpClient.get<any>(`company/company/${id}`);
  }

  getCompaniesAll() {
    return httpClient.get<any>("company");
  }

  getCompaniesDistributor(id: number) {
    return httpClient.get<any>(`distributor/company/${id}`);
  }
}

export default new AppService();
