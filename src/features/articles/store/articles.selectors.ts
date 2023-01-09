import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { FeatureState } from "./articles.reducer";

/**
 * Feature state
 */
const featureSelectors = (state: RootState) => state.articles;


export const isLoadingArticles = createSelector(
  featureSelectors,
  (state: FeatureState) => state.loading
);

export const selectArticles = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.articles.map((item, index) => ({
        id: item.id,
        productName: item.productName,
        decimalShow: item.decimalShow,
        barCode:  item.barCode,
        code: item.code,
        unitCode: item.unitCode,
        vat: item.vat,
        groupName: item.groupName,
        typeName: item.typeName,
        price: item.priceLists ?  item.priceLists.slice(-1)[0].price  :  "",
        prodctId: item.prodctId
      }))  
  }
);


export const   selectSubject = createSelector(
  featureSelectors,
  (state: FeatureState) => state.subject
);

export const   selectOpenCreateArtical = createSelector(
  featureSelectors,
  (state: FeatureState) => state.openCreateArticles
);


export const   selectOpenCreateArticalPrice = createSelector(
  featureSelectors,
  (state: FeatureState) => state.openCreateArticlesPrice
);


export const   selectOpenSucessModal = createSelector(
  featureSelectors,
  (state: FeatureState) => state.openSucessModal
);



