import commonHttpClient from "../../../app/http-common";

class PublicService {
    getCompaniesAll() {
    return commonHttpClient.get<any>("company");
  }

  getMarketPlacesAll(companyId: number | string) {
    return commonHttpClient.get<any>(`marketplace/company/${companyId}`);
  }

  getPointOfSalesAll(companyId: number | string) {
    return commonHttpClient.get<any>(`pointofsale/company/${companyId}`);
  }

  getObjectsAll(companyId: number | string) {
    return commonHttpClient.get<any>(`object/${companyId}`);
  }

  getUnitsAll() {
    return commonHttpClient.get<any>("unit");
  }

  getVatAll() {
    return commonHttpClient.get<any>("vat");
  }

}
export default new PublicService();
