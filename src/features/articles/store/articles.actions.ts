import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import RegistriesPublicService from "../services/articles.service";
import  { ArticleFormModel }  from  "../models/articles.models"


/**
 * Async Custom Actions
 */
const sendArticle: AsyncThunk<any, {data: ArticleFormModel }, {}> = createAsyncThunk<any, {data: ArticleFormModel }>(
  "POST/articleSend",
  async (data,_) => {
    return await RegistriesPublicService.sendArticle(data.data)
    .then((res: any)  =>   {return {data: res.data, message: 'sucsess'}})
      /*.then(async (res: any) => { 
        const dataPrice = {
            data: res.data[0].createProduct,
            price: data.data.price
        }
        let message: string = "";
        await RegistriesPublicService.sendArticlesPrice(dataPrice)
            .then((res:any) =>  message = 'sucsess')
            .catch((er: any) =>  message = 'error')
        return   message
      })*/
      .catch((err: any) => 'error');
  }
);



const sendArticlesPrice: AsyncThunk<any, {data: any, price: any}, {}> = createAsyncThunk<any, {data: any;  price: any}>(
    "POST/articleSend",
    async (data,_) => {
      return await RegistriesPublicService.sendArticlesPrice(data)
        .then((res: any) =>  'sucsess')
        .catch((err: any) => 'error');
    }
  );



  const sendSubject: AsyncThunk<any, {data: any}, {}> = createAsyncThunk<any, {data: any}>(
    "POST/subjectSend",
    async (data,_) => {
      return await RegistriesPublicService.sendSubject(data)
        .then((res: any) =>  'sucsess')
        .catch((err: any) => 'error');
    }
  );


const getArticles: AsyncThunk<any, { uuid: number | string }, {}> = createAsyncThunk<any, { uuid: number | string }>(
  "GET/articles",
  async (params) => {
    return     await RegistriesPublicService.getArticles(params.uuid)
    .then((res: any) => res.data)
    .catch((err: any) => []);
}
);


const getSubject: AsyncThunk<any, { companyId: number | string }, {}> = createAsyncThunk<any, { companyId: number | string }>(
  "GET/subjectget",
  async (params) => {
    return     await RegistriesPublicService.getSubject(params.companyId)
    .then((res: any) => res.data)
    .catch((err: any) => []);
}
);




export {
  sendArticle,
  getArticles,
  sendArticlesPrice,
  getSubject,
  sendSubject
};
