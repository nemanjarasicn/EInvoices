import {
    ActionReducerMapBuilder,
    createEntityAdapter,
    createSlice,
    EntityAdapter,
    EntityState,
    Slice,
  } from "@reduxjs/toolkit";
  import { ObjectsDto } from "../models/registries.models";
  import {
    sendObjects,
    getObjects,
    getMarketPlaces,
    getPointOfSales,
    getCompanies,
    getUnits,
    getVat,
    getGroups,
    getWarehouses,
    getUsers,
    getCompanyInfo,
    getCompaniesDistributor
  } from "./registries.actions";
  
  const FEATURE_REGISTRIES_KEY: string = "registries";

  export interface  FeatureState {
    objects: any[];
    marketPlaces: any[];
    pointOfSales: any[];
    companies:  any[];
    units: any[],
    vat:  any[];
    groups:  any[];
    warehouses:  any[];
    users: any[];
    openModalPdf: boolean;
    companyInfo: any;
    companyDistributor:  any[];
    loading: boolean;
  }

  const initialState: FeatureState = {
    objects: [],
    marketPlaces: [],
    pointOfSales:   [],
    companies:  [],
    units: [],
    vat:  [],
    groups:  [],
    warehouses: [],
    users:  [],
    openModalPdf:  false,
    companyInfo: {},
    companyDistributor: [],
    loading: false,
  };
  
  const registriesSlice: Slice<FeatureState> = createSlice({
    name: FEATURE_REGISTRIES_KEY,
    initialState: initialState,
    reducers: {
      setopenModalPdf: (state,{payload}) => ({
        ...state,
        openModalPdf: payload,
      }),
      //custom
     },
     extraReducers: (builder) => {
      getAsyncObjects(builder);
      getAsyncMarketPlaces(builder);
      getAsyncPointOfSales(builder);
      getAsyncCompanies(builder);
      getAsyncUnits(builder);
      getAsyncVat(builder);
      getAsyncGroups(builder);
      getAsyncWarehouses(builder);
      getAsyncUsers(builder);
      getAsyncCompanyInfo(builder);
      getAsyncDistributorCompanies(builder);
    },
    }
  )
  
  export const {
    setopenModalPdf
  } = registriesSlice.actions;
  
  export default registriesSlice.reducer;


  function getAsyncObjects(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getObjects.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      objects: payload,
    }));
    builder.addCase(getObjects.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getObjects.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      objects: [],
      error: (payload as any).error,
    }));
  }

  function getAsyncMarketPlaces(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getMarketPlaces.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      marketPlaces: payload,
    }));
    builder.addCase(getMarketPlaces.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getMarketPlaces.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      marketPlaces: [],
      error: (payload as any).error,
    }));
  }

  function getAsyncPointOfSales(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getPointOfSales.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      pointOfSales: payload,
    }));
    builder.addCase(getPointOfSales.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getPointOfSales.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      pointOfSales: [],
      error: (payload as any).error,
    }));
  }


  function getAsyncCompanies(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getCompanies.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      companies: payload,
    }));
    builder.addCase(getCompanies.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getCompanies.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      companies: [],
      error: (payload as any).error,
    }));
  }

  function getAsyncUnits(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getUnits.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      units: payload,
    }));
    builder.addCase(getUnits.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getUnits.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      units: [],
      error: (payload as any).error,
    }));
  }

  function getAsyncVat(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getVat.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      vat: payload,
    }));
    builder.addCase(getVat.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getVat.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      vat: [],
      error: (payload as any).error,
    }));
  }
  

  function getAsyncGroups(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getGroups.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      groups: payload,
    }));
    builder.addCase(getGroups.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getGroups.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      groups: [],
      error: (payload as any).error,
    }));
  }

  
  function getAsyncWarehouses(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getWarehouses.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      warehouses: payload,
    }));
    builder.addCase(getWarehouses.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getWarehouses.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      warehouses: [],
      error: (payload as any).error,
    }));
  }

  function getAsyncUsers(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      users: payload,
    }));
    builder.addCase(getUsers.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getUsers.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      users: [],
      error: (payload as any).error,
    }));
  }


  function getAsyncCompanyInfo(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getCompanyInfo.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      companyInfo: payload,
    }));
    builder.addCase(getCompanyInfo.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getCompanyInfo.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      companyInfo:  {},
      error: (payload as any).error,
    }));
  }


  function getAsyncDistributorCompanies(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getCompaniesDistributor.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      companyDistributor: payload,
    }));
    builder.addCase(getCompaniesDistributor.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getCompaniesDistributor.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      companyDistributor: [],
      error: (payload as any).error,
    }));
  }

  
  
  // addOne: accepts a single entity, and adds it if it's not already present.
  // addMany: accepts an array of entities or an object in the shape of Record<EntityId, T>, and adds them if not already present.
  // setOne: accepts a single entity and adds or replaces it.
  // setMany: accepts an array of entities or an object in the shape of Record<EntityId, T>, and adds or replaces them.
  // setAll: accepts an array of entities or an object in the shape of Record<EntityId, T>, and replaces all existing entities with the values in the array.
  // removeOne: accepts a single entity ID value, and removes the entity with that ID if it exists.
  // removeMany: accepts an array of entity ID values, and removes each entity with those IDs if they exist.
  // removeAll: removes all entities from the entity state object.
  // updateOne: accepts an "update object" containing an entity ID and an object containing one or more new field values to update inside a changes field, and performs a shallow update on the corresponding entity.
  // updateMany: accepts an array of update objects, and performs shallow updates on all corresponding entities.
  // upsertOne: accepts a single entity. If an entity with that ID exists, it will perform a shallow update and the specified fields will be merged into the existing entity, with any matching fields overwriting the existing values. If the entity does not exist, it will be added.
  // upsertMany: accepts an array of entities or an object in the shape of Record<EntityId, T> that will be shallowly upserted.
  