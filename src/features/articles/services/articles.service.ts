
import publicClient from "./htpp-public-gov";
import  { selectMarketPlaces }  from  "../../shared/components/form-fields/store/form.selectors"
import { useAppDispatch, useAppSelector } from "../../../app/hooks";


class RegistriesPublicService {
  // MOCK CLIENT

  sendArticle(data: any) {
   console.log('data articles', data);
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
              "barCode": data.barCode,
              "code":  data.code,
              "idCompany":   data.idCompany,
              "idObject": 1,
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
 

  getArticles(uuid:   number  |  string) {
    return publicClient.get<any>
    (`search/products/pm/${uuid}`,
    );
  }


  
  
}
export default new RegistriesPublicService();
