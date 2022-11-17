import httpClient from "../http-common";

class AppService {
  public getLoggedSubject(id: number, token: string) {
    const config = {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return httpClient.get<any>(`company/company/${id}`, config);
  }
}

export default new AppService();
