import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { FeatureState } from "./registries.reducer";

/**
 * Feature state
 */
const featureSelectors = (state: RootState) => state.registries;


export const isLoadingRegistries = createSelector(
  featureSelectors,
  (state: FeatureState) => state.loading
);


export const selectIds = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    const ids: number[] = [];
    state.objects.map((object) => {
      if (Boolean(object.idObject)) ids.push(object.idObject);
    });
    return ids;
  }
);

export const selectObjects = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.objects.map((item, index) => ({
      name: item.name,
      uuid: item.uuid,
      idObject: item.idObject,
      latitude:  item.point.latitude,
      longitude: item.point.longitude
    }))  
  }
);

export const selectMarketPlaces = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.marketPlaces;
  }
);

export const selectPointOfSales = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.pointOfSales;
  }
);


export const selectCompanies = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.companies;
  }
);

export const selectUnits = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.units;
  }
);

export const selectVat = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.vat;
  }
);

export const selectGroups = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.groups;
  }
);

export const selectWarehouses = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.warehouses;
  }
);