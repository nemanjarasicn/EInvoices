import publicClient from "./htpp-public-gov";
import { format } from 'date-fns'


class RegistriesPublicService {
  // MOCK CLIENT

  sendObject(data: any) {
    
    return publicClient.post<any>
    ("object",
    {
      "name": data.data.objectName,
      "idCompany": data.data.companyId,
      "point":{
          "latitude":data.data.latitude,
          "longitude": data.data.longitude
      }
      
  }
    );
  }

  sendMarketPlace(data: any) {
    return publicClient.post<any>
    ("marketplace",
    [{
      "objectUuid": data.data.objectUuid.item.uuid,
      "marketPlaceName": data.data.marketPlaceName,
      "idCompany":  data.data.companyId
    }]
    );
  }

  createTypePriceList(data: any) {
    return publicClient.post<any>
    ("pricing",
    {
      "title":"Redovni cenovnik", //TODO some title, depends of user
      "main":"true",
      "actionManual":"true",
      "actionAutomatic":"true",
      "recursivePricing":"true",
     "client":"true",
      "createBy":1,
      "uuidMarketPlace":[ data.uuid],
      "idCompany": 7
      }
    );
  }


  createPriceList(data: any) { 
    return publicClient.post<any>
    ("pricinglist",
    [
    {
      "description":"nzm",
      "priority":1,
      "dateFrom":"1900-05-02 01:01:01",
      "dateTo":"2024-12-12 01:01:01",
      "activ":"true",
      "auditedEntity":{"createdBy":1,"lastUpdatedBy":1},
      "pricingTypeDtoRequest":{
          "id": data.payload.data.id
      }
      }   
      
      ]
    );
  }

  sendPointOfSales(data:  any) {
    return publicClient.post<any>
    ("pointofsale",
    [{
      "namePointOfSale": data.namePointOfSale,
      "idMarketPlace": data.idMarketPlace.id,
      "uuidMarketPlace": data.idMarketPlace.uuid,
      "companyName": data.companyNameSend,
      "idCompany":  data.idCompany,
      "code": data.code,
      "auditedEntity":{
          "createdBy":1,
          "lastUpdatedBy":1
      }
      
  	 }]
    );
  }

  sendCompanies(data: any) {
    let today = new Date()
    return publicClient.post<any>
    ("company",
    {
      "companyName": data.data.companyName,
      "primaryVat":"true",
      "pib": data.data.pib,
      "date": today,
      "apiKey":data.data.apiKey,
      "mb": data.data.mb,
      "address":  data.data.address,
      "zip": data.data.zip,
      "city":  data.data.city,
      "country":  data.data.country,
      "email": data.data.email,
      "payeeFinancialAccountDto":[{

        "payeeFinancialAccountValue":   data.data.payeeFinancialAccount
    }]
  }
    );
  }


  sendDistributor(data: any) {
   

    let today = new Date()
    const todayFormat = format(today, 'yyyy-MM-dd');
    return publicClient.post<any>
    ("distributor",
    {
      "distributorName": data.data.companyName,
      "pib":   data.data.pib,
      "date":  todayFormat,
      "mb":  data.data.mb,
      "address": data.data.address,
      "zip":  data.data.zip,
      "city":  data.data.city,
      "country":  data.data.country,
      "email":"nemanja@gmail.com"
    }
    );
  }

  sendDistributorCompany(idCompany:   number  |  string,  idDistributor?: number  |  string ) {
   
    
    return publicClient.put<any>
    (`distributor/${idCompany}/${idDistributor}`,
    );
  }

  sendsubscribe(data: any) {
    
    return publicClient.post<any>
    ("subscribe",
      {
        "apiKey": data.data.apiKey,
        "companyId":  data.data.idCompany,
        "companyName":  data.data.companyName
      }
    );
  }


  sendWarehouse(data: any) {
    return publicClient.post<any>
    ("warehouse",
      [
        { "warehouseName":  data.data.warehouses,
          "idMarketPlace":  data.data.marketPlace.id,
          "marketPlaceUuid": data.data.marketPlace.uuid
        }
      ]
    );
  }

  sendUnit(data: any) {
    return publicClient.post<any>
    ("unit",
    [{
      "productUnitName":  data.data.productUnitName,
      "productUnitCode":   data.data.productUnitCode,
      "productUnitPlural":  data.data.productUnitPlural,
      "productUnitPriority": data.data.productUnitPriority,
      "productUnitDecimalShow":   data.data.productUnitDecimalShow,
      "deafult":"true",
      "auditedEntity":
  
      {
          "createdBy":1,
          "lastUpdatedBy":1
      }
  }]
    );
  }


  sendGroup(data: any) {
    return publicClient.post<any>
    ("group",
    [{ 
      "idPointOfSale": data.data.idPointOfSale.uuid,
      "groupName":  data.data.groupName,
      "orderGroup":1,
      "idCompany": data.data.idCompany,
      "idObject": data.data.idObject.idObject,
      "auditedEntity":
      {
          "createdBy":1,
          "lastUpdatedBy":1
      }
  }]
    );
  }


  sendVat(data: any) {
    return publicClient.post<any>
    ("vat",
    [{
      "name":  data.data.name,
      "value1": Number(data.data.value1),
      "value2": Number(data.data.value2),
      "value3":  Number(data.data.value3),
      "activ":"true",
     "code":  data.data.code,
      "deafult":"true",
      "idCountry":  1,
      "auditedEntity":
  
      {
          "createdBy":1,
          "lastUpdatedBy":1
      }
  }]
    );
  }


  sendUsers(data: any) {
    return publicClient.post<any>
    ("/user/registration",
    {
      "username":  data.data.username,
      "password":  data.data.password,
      "roleName":[data.data.userRole.roleName],
      "companies": [data.data.companyId]
  
  }
    );
  }

  getObjects(id:   number  |  string) {
    return publicClient.get<any>
    (`object/${id}`,
    );
  }

  getMarketPlacec(id: number | string) {
    return publicClient.get<any>
    (`marketplace/company/${id}`,
    );
  }

  getPointOfSales(id: number  |  string) {
    return publicClient.get<any>
    (`pointofsale/company/${id}`,
    );
  }


  getCompanies() {
    return publicClient.get<any>
    ("company",
    );
  }

  getCompaniesDistributor(idCompany: number | string) {
    return publicClient.get<any>
    (`distributor/company/${idCompany}`,
    );
  }

  getUnits() {
    return publicClient.get<any>
    ("unit",
    );
  }

  getVat() {
    return publicClient.get<any>
    ("vat",
    );
  }


  getUsers(id:   number  |  string) {
    return publicClient.get<any>
    (`user/${id}`,

    );
  }

  getGroups(uuid:   number  |  string) {
    return publicClient.get<any>
    (`group/${uuid}`,
    );
  }


  getWarehouses(uuidMarketPlace:  string) {
    return publicClient.get<any>
    (`warehouse//marketplace/${uuidMarketPlace}`,
    );
  }
  

  getCompanyInfo(id:  number  |  string) {
    return publicClient.get<any>
    (`company/company/${id}`,
    );
  }
  
}
export default new RegistriesPublicService();
