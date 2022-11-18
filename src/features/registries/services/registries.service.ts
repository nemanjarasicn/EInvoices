import publicClient from "./htpp-public-gov";

class RegistriesPublicService {
  // MOCK CLIENT

  sendObject() {
    return publicClient.post<any>
    ("object",
    {
      "name":"test objekat Nemanja",
      "idCompany":7,
      "point":{
          "latitude":"44.787197",
          "longitude":"20.457273"
      }
      
  }
    );
  }

  getObjects() {
    return publicClient.get<any>
    ("object/7",
    );
  }

  
}
export default new RegistriesPublicService();
