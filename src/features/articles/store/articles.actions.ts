import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import RegistriesPublicService from '../services/articles.service';
import { ArticleFormModel } from '../models/articles.models';

/**
 * Async Custom Actions
 */
const sendArticle: AsyncThunk<any, { data: ArticleFormModel }, {}> =
  createAsyncThunk<any, { data: ArticleFormModel }>(
    'POST/articleSend',
    async (data, _) => {
      return await RegistriesPublicService.sendArticle(data.data)
        .then((res: any) => {
          return { data: res.data, message: 'sucsess' };
        })
        .catch((err: any) => 'error');
    }
  );

const sendArticleUpdate: AsyncThunk<
  any,
  { data: ArticleFormModel; id: number | string; status: any },
  {}
> = createAsyncThunk<
  any,
  { data: ArticleFormModel; id: number | string; status: any }
>('POST/articleSend', async (data, _) => {
  return await RegistriesPublicService.sendArticleUpdate(
    data.data,
    data.id,
    data?.status
  )
    .then((res: any) => {
      return { data: res.data, message: 'sucsess' };
    })
    .catch((err: any) => 'error');
});

const sendArticlesPrice: AsyncThunk<any, { data: any; price: any }, {}> =
  createAsyncThunk<any, { data: any; price: any }>(
    'POST/articleSend',
    async (data, _) => {
      return await RegistriesPublicService.sendArticlesPrice(data)
        .then((res: any) => 'sucsess')
        .catch((err: any) => 'error');
    }
  );

const sendSubject: AsyncThunk<any, { data: any }, {}> = createAsyncThunk<
  any,
  { data: any }
>('POST/subjectSend', async (data, _) => {
  return await RegistriesPublicService.sendSubject(data)
    .then((res: any) => 'sucsess')
    .catch((err: any) => 'error');
});

const getArticles: AsyncThunk<any, { uuid: number | string }, {}> =
  createAsyncThunk<any, { uuid: number | string }>(
    'GET/articles',
    async (params) => {
      return await RegistriesPublicService.getArticles(params.uuid)
        .then((res: any) => res.data)
        .catch((err: any) => []);
    }
  );

const getSubject: AsyncThunk<any, { companyId: number | string }, {}> =
  createAsyncThunk<any, { companyId: number | string }>(
    'GET/subjectget',
    async (params) => {
      return await RegistriesPublicService.getSubject(params.companyId)
        .then((res: any) => res.data)
        .catch((err: any) => []);
    }
  );

const updateSubject: AsyncThunk<
  any,
  {
    idSubject: number | string;
    data: any;
    idpayeeFinancialAccountDto: string | number;
  },
  {}
> = createAsyncThunk<
  any,
  {
    idSubject: number | string;
    data: any;
    idpayeeFinancialAccountDto: string | number;
  }
>('GET/subjectupdate', async (params) => {
  return await RegistriesPublicService.updateSubject(
    params.idSubject,
    params.data,
    params.idpayeeFinancialAccountDto
  )
    .then((res: any) => 'sucsess')
    .catch((err: any) => 'error');
});

const getSubjectDetails: AsyncThunk<any, { pib: string | number }, {}> =
  createAsyncThunk<any, { pib: string | number }>(
    'GET/subjectdetailsget',
    async (params) => {
      return await RegistriesPublicService.getSubjectDetails(params.pib)
        .then((res: any) => res.data)
        .catch((err: any) => []);
    }
  );

export {
  sendArticle,
  getArticles,
  sendArticlesPrice,
  getSubject,
  sendSubject,
  updateSubject,
  getSubjectDetails,
  sendArticleUpdate,
};
