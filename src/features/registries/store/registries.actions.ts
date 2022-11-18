import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import RegistriesPublicService from "../services/registries.service";
/**
 * Async Custom Actions
 */
const sendObjects: AsyncThunk<any, void, {}> = createAsyncThunk(
  "POST/objects",
  async () => {
    return await RegistriesPublicService.sendObject()
      .then((res: any) => 'sucsses')
      .catch((err: any) => 'error');
  }
);

const getObjects: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/objects",
  async () => {
    return     await RegistriesPublicService.getObjects()
    .then((res: any) => res.data.objectDtoResponse)
    .catch((err: any) => 'error');
}
);


export {
  sendObjects,
  getObjects
};
