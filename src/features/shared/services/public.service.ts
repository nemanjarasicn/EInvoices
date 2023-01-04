import commonHttpClient from "../../../app/http-common";

class PublicService {
    getCompaniesAll() {
    return commonHttpClient.get<any>("company");
  }

  getMarketPlacesAll(companyId: number | string) {
    return commonHttpClient.get<any>(`marketplace/company/${companyId}`);
  }


  getSubjectCategory() {
    return commonHttpClient.get<any>(`subject/category`);
  }

  getSubjectType() {
    return commonHttpClient.get<any>(`subject/type`);
  }

  getUserRole() {
    return commonHttpClient.get<any>(`role`);
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


  getTaxCode() {
    return commonHttpClient.get<any>("tax");
  }

  getTaxBase(id:  number  |  string) {
    return commonHttpClient.get<any>(`tax/base/${id}`);
  }

  getDistributor() {
    return commonHttpClient.get<any>(`distributor`);
  }


  getVatAll() {
    return commonHttpClient.get<any>("vat");
  }

}
export default new PublicService();
