import httpClient from "../http-common";

class AppService {
  public getLoggedSubject(id: number) {
    return httpClient.get<any>(`company/company/${id}`);
  }

  getCompaniesAll() {
    return httpClient.get<any>("company");
  }

  getMarketPlacesLogin(companyId: number  |  string) {
    return httpClient.get<any>(`marketplace/company/${companyId}`);
  }

  getCompaniesDistributor(id: number) {
    return httpClient.get<any>(`distributor/company/${id}`);
  }
}

export default new AppService();
