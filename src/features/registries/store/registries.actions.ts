import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import RegistriesPublicService from "../services/registries.service";
import { ObjectFormModel, IProps, CompanyFormModel, PointOfSaleFormModel, WarehouseFormModel,  UnitFormModel,   GroupFormModel, VatFormModel, UsersFormModel } from "../models/registries.models";
import { MarketPlaceFormModel } from "../models/registries.models";

/**
 * Async Custom Actions
 */
const sendObjects: AsyncThunk<any, {data: ObjectFormModel}, {}> = createAsyncThunk<any, {data: ObjectFormModel}>(
  "POST/objectsSend",
  async (data,_) => {
    return await RegistriesPublicService.sendObject(data)
      .then((res: any) => 'sucsses')
      .catch((err: any) => 'error');
  }
);

const sendMarketPlace: AsyncThunk<any,  {data: MarketPlaceFormModel}, {}> = createAsyncThunk<any, {data: MarketPlaceFormModel}>(
  "POST/marketPlacesSend",
  async (data,_) => {
    console.log(data);
    return await RegistriesPublicService.sendMarketPlace(data)
    .then(async (res: any) => {
      let message: string = "";
      let err: boolean = false;
      await _.dispatch(createTypePriceList(res.data[0]))
      .then(async (resPrice: any) =>  {
       await _.dispatch(createPriceList(resPrice))
        .then((res:  any)  =>  message = "sucsess")
        .catch((err:  any) =>  message = "error")
      })
      .catch((errPrice: any) => message = "error")
      return   message
    })
    .catch((err: any) => 'error');
  }
);

const createTypePriceList: AsyncThunk<any, {data: PointOfSaleFormModel}, {}> = createAsyncThunk<any, {data: PointOfSaleFormModel}>(
  "POST/createTypePriceListSend",
  async (data,_) => {
    return await RegistriesPublicService.createTypePriceList(data)
      .then((res: any) =>  res)
      .catch((err: any) => []);
  }
);


const createPriceList: AsyncThunk<any, {data: PointOfSaleFormModel}, {}> = createAsyncThunk<any, {data: PointOfSaleFormModel}>(
  "POST/createTypePriceListSend",
  async (data,_) => {
    return await RegistriesPublicService.createPriceList(data)
      .then((res: any) => 'sucsses')
      .catch((err: any) => []);
  }
);

const sendPointOfSales: AsyncThunk<any, {data: PointOfSaleFormModel}, {}> = createAsyncThunk<any, {data: PointOfSaleFormModel}>(
  "POST/pointOfSalesSend",
  async (data,_) => {
    return await RegistriesPublicService.sendPointOfSales(data)
      .then((res: any) => 'sucsses')
      .catch((err: any) => []);
  }
);


const sendWarehouse: AsyncThunk<any, {data: WarehouseFormModel}, {}> = createAsyncThunk<any, {data: WarehouseFormModel}>(
  "POST/warehouseSend",
  async (data,_) => {
    return await RegistriesPublicService.sendWarehouse(data)
      .then((res: any) => 'sucsses')
      .catch((err: any) => 'error');
  }
);


const sendUnit: AsyncThunk<any, {data: UnitFormModel}, {}> = createAsyncThunk<any, {data: UnitFormModel}>(
  "POST/unitSend",
  async (data,_) => {
    return await RegistriesPublicService.sendUnit(data)
      .then((res: any) => 'sucsses')
      .catch((err: any) => 'error');
  }
);


const sendGroup: AsyncThunk<any, {data: GroupFormModel}, {}> = createAsyncThunk<any, {data: GroupFormModel}>(
  "POST/groupSend",
  async (data,_) => {
    console.log('data', data);
    return await RegistriesPublicService.sendGroup(data)
      .then((res: any) => 'sucsses')
      .catch((err: any) => 'error');
  }
);


const sendVat: AsyncThunk<any, {data: VatFormModel}, {}> = createAsyncThunk<any, {data: VatFormModel}>(
  "POST/vatSend",
  async (data,_) => {
    return await RegistriesPublicService.sendVat(data)
      .then((res: any) => 'sucsses')
      .catch((err: any) => 'error');
  }
);


const sendUsers: AsyncThunk<any, {data: UsersFormModel}, {}> = createAsyncThunk<any, {data: UsersFormModel}>(
  "POST/usersSend",
  async (data,_) => {
    console.log(data);
    return await RegistriesPublicService.sendUsers(data)
      .then((res: any) => 'sucsses')
      .catch((err: any) => 'error');
  }
);

const getObjects: AsyncThunk<any, { companyId: number | string }, {}> = createAsyncThunk<any, { companyId: number | string }>(
  "GET/objects",
  async (params) => {
    return     await RegistriesPublicService.getObjects(params.companyId)
    .then((res: any) => res.data.objectDtoResponse)
    .catch((err: any) => []);
}
);

const getMarketPlaces: AsyncThunk<any, { companyId: number | string }, {}> = createAsyncThunk<any, { companyId: number | string }>(
  "GET/marketPlaces",
  async (params) => {
    return     await RegistriesPublicService.getMarketPlacec(params.companyId)
    .then((res: any) => res.data)
    .catch((err: any) => []);
}
);

const getPointOfSales: AsyncThunk<any, { companyId: number | string }, {}> = createAsyncThunk<any, { companyId: number | string }>(
  "GET/pointOfSales",
  async (params) => {
    return     await RegistriesPublicService.getPointOfSales(params.companyId)
    .then((res: any) => res.data)
    .catch((err: any) => []);
}
);


const getCompanies: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/companies",
  async () => {
    return     await RegistriesPublicService.getCompanies()
    .then((res: any) => res.data)
    .catch((err: any) => []);
}
);

const sendCompanies: AsyncThunk<any, {data: CompanyFormModel}, {}> = createAsyncThunk<any, {data: CompanyFormModel}>(
  "POST/companySend",
  async (data,_) => {
    return await RegistriesPublicService.sendCompanies(data)
      .then((res: any) => 'sucsses')
      .catch((err: any) => 'error');
  }
);


const sendsubscribe: AsyncThunk<any, {data: CompanyFormModel}, {}> = createAsyncThunk<any, {data: CompanyFormModel}>(
  "POST/subscribeSend",
  async (data,_) => {
    return await RegistriesPublicService.sendsubscribe(data)
      .then((res: any) => 'sucsses')
      .catch((err: any) => 'error');
  }
);

const getWarehouses: AsyncThunk<any, { uuid:   string }, {}> = createAsyncThunk<any, { uuid:    string }>(
  "GET/Warehouses",
  async (params) => {
    return     await RegistriesPublicService.getWarehouses(params.uuid)
    .then((res: any) => res.data)
    .catch((err: any) => []);
}
);

const getUnits: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/Units",
  async () => {
    return     await RegistriesPublicService.getUnits()
    .then((res: any) => res.data)
    .catch((err: any) => []);
}
);

const getVat: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/Vat",
  async () => {
    return     await RegistriesPublicService.getVat()
    .then((res: any) => res.data)
    .catch((err: any) => []);
}
);

const getUsers: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/Users",
  async () => {
    return     await RegistriesPublicService.getUsers()
    .then((res: any) => res.data.objectDtoResponse)
    .catch((err: any) => []);
}
);


const getGroups: AsyncThunk<any, { uuid: number | string }, {}> = createAsyncThunk<any, { uuid: number | string }>(
  "GET/groups",
  async (params) => {
    return     await RegistriesPublicService.getGroups(params.uuid)
    .then((res: any) => res.data)
    .catch((err: any) => []);
}
);


export {
  sendObjects,
  getObjects,
  getMarketPlaces,
  sendMarketPlace,
  getPointOfSales,
  sendPointOfSales,
  getCompanies,
  sendCompanies,
  getUnits,
  getVat,
  getUsers,
  getGroups,
  getWarehouses,
  sendWarehouse,
  sendUnit,
  sendGroup,
  sendVat,
  sendsubscribe,
  sendUsers
};
