import { createDraftSafeSelector, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { FeatureState } from './articles.reducer';

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
      decimalShow: item.decimalShow === true ? 'da' : 'ne',
      barCode: item.barCode,
      code: item.code,
      unitCode: item.unitCode,
      unitName: item.unitName,
      vat: item.vat,
      groupName: item.groupName,
      typeName: item.typeName,
      price: item.priceLists ? item.priceLists.slice(-1)[0].price : '',
      prodctId: item.prodctId,
    }));
  }
);

export const selectSubject = createSelector(
  featureSelectors,
  (state: FeatureState) =>
    state.subject.map((item, index) => ({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      companyName: item.companyName,
      pib: item.pib,
      identificationNumber: item.identificationNumber,
      mb: item.mb,
      userId: item.userId,
      companyId: item.companyId,
      address: item.address,
      city: item.city,
      zip: item.zip,
      discount: item.discount,
      phone: item.phone,
      email: item.email,
      jbkjs: item.jbkjs,
      idVat: item.idVat,
      vatName: item.vatName,
      payeeFinancialAccountDto: item.payeeFinancialAccountDto,
      subjectIdCategory: item.subjectIdCategory,
      subjectIdType: item.subjectIdType,
    }))
);

export const selectOpenCreateArtical = createSelector(
  featureSelectors,
  (state: FeatureState) => state.openCreateArticles
);

export const selectOpenCreateSubject = createSelector(
  featureSelectors,
  (state: FeatureState) => state.openCreateSubject
);

export const selectOpenCreateArticalPrice = createSelector(
  featureSelectors,
  (state: FeatureState) => state.openCreateArticlesPrice
);

export const selectOpenSucessModal = createSelector(
  featureSelectors,
  (state: FeatureState) => state.openSucessModal
);
