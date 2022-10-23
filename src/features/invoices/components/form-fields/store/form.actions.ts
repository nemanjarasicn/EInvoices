import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import InvoicePublicService from "../../../services/invoice.service";

/**
 * Get Async Unit Mesures
 */
const getAllUnitMesures: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/Units",
  async () => {
    return await InvoicePublicService.getAllUnitMesures()
      .then((res) => res.data)
      .catch((err) => []);
  }
);

/**
 * Get Async Companies
 */
const getClientCompanies: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/Companies",
  async () => {
    return await InvoicePublicService.getClientCompanies()
      .then((res) => res.data)
      .catch((err) => []);
  }
);

export { getAllUnitMesures, getClientCompanies };
