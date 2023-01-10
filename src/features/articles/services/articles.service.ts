
import publicClient from "./htpp-public-gov";


class RegistriesPublicService {
  // MOCK CLIENT

  sendArticle(data: any) {
    return publicClient.post<any>
    ("catalog",
    [
        {
           "productCreate":{
              "productName":  data.productName,
              "sale": "true",
              "stock": "true",
              "recipe":   "true",
              "production": "true",
              "consumables": "true",
              "modificationRequired":   "true",
              "decimalShow": "true",
              "priceChangeForbidden":  "true",
              "barCode": data.barCode ? data.barCode  :  "00000",
              "code":  data.code,
              "idCompany":   data.idCompany,
              "idObject": 1,
              "taxCode": data.productTaxCategory.taxCategoryCode,
              "taxName": data.productTaxCategory.taxCategoryName,
              "taxValue1":  data.productTaxCategory.value1,
               "baseCode":  data.taxBase.name,
              "productGroupRequest":[
                 {
                    "idGroup":1,
                    "groupName":"Dj"
                 }
              ],
              "productTypeRequest":{
                 "idType":1,
                 "typeName":"Proizvod"
              },
              "productUnitRequest":{
                 "idUnit":   data.productUnitRequest.id,
                 "unitName": data.productUnitRequest.productUnitName
              },
              "productVatRequest":{
                 "idVat":  data.productVatRequest.id,
                 "vatName":  data.productVatRequest.name

              },
              "productTaxCategory":{
                     "idTaxCategory": data.productTaxCategory.idTaxCategory,
                     "taxCategoryCode": data.productTaxCategory.taxCategoryCode,
                     "taxCategoryName": data.productTaxCategory.taxCategoryName,
                     "value1":  data.productTaxCategory.value1,
                     "idCountry":  data.productTaxCategory.idCountry,
              }, 
              "marketPlaceDtos": data.marketPlaceDtos
              /*[{
                  "uuid":"96ad51f3da3e40bb",
                     "id":28,
                 "marketPlaceName":"restoran PM"
              }]*/,
              "warehouseDtos":[
              ],
              "pointOfSaleRequest":[
                //TODO set to be dinamicly, foe efacture we dont have point of sale
                    /* {
                         "uuid":"b66ea844064040a5",
                    "idPointOfSale":2,
                    "pointOfName":"Kasa1234"
                 }*/
              ],
              "auditedEntity":{
                 "createdBy":1,
                 "lastUpdatedBy":1
              }
           }
        }
     ]
    );
}

sendArticlesPrice(data: any) {
    return publicClient.post<any>
    ("pricinglistdetails",
        [{
            "productId": data.data.id,
            "productName": data.data.productName,
            "date":"2022-05-02 01:01:01",
            "barCode":  data.data.barCode,
            "price": data.price.price,
            "auditedEntity":{"createdBy":1,"lastUpdatedBy":1},
            "priceListDtoRequest":{
                "id":5
            }}
            
            
            ]
    );
}
 


sendSubject(data: any) {
   return publicClient.post<any>
   ("subject",
       {
           
            "firstName":  data.data.firstName,
            "lastName":  data.data.lastName,
            "companyName":  data.data.companyName,
            "identificationNumber":     data.data.identificationNumber,
            "pib":     data.data.pib,
            "mb":  data.data.mb,
            "companyId":    data.data.companyId,
            "address":   data.data.address,
            "city":  data.data.city, 
            "zip":    data.data.zip,
            "phone":    data.data.phone,
            "email":   data.data.email,
            "jbkjs":   "",
            "subjectIdCategory":   data.data.subjectIdCategory.id,
            "subjectIdType":  data.data.subjectIdType.id,
            "payeeFinancialAccountDto": [{
               "payeeFinancialAccountValue": `${data.data.payeeFinancialAccountDto}`}],
            "userId":   "",
            "discount": 0,
            "idVat": 1,
            "vatName":  "",
      }
   );
}

  getArticles(uuid:   number  |  string) {
    return publicClient.get<any>
    (`search/products/pm/${uuid}`,
    );
  }


  

  getSubject(companyId:   number  |  string) {
   return publicClient.get<any>
   (`subject/${companyId}`,
   );
 }


  
  
}
export default new RegistriesPublicService();
