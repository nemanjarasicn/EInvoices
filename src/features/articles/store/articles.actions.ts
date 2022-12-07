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
      .then(async (res: any) => { 
        const dataPrice = {
            data: res.data[0].createProduct,
            price: data.data.price
        }
        let message: string = "";
        console.log('asasa', dataPrice);
        await RegistriesPublicService.sendArticlesPrice(dataPrice)
            .then((res:any) =>  message = 'sucsess')
            .catch((er: any) =>  message = 'error')
        return   message
      })
      .catch((err: any) => 'error');
  }
);



/*const sendArticlesPrice: AsyncThunk<any, {data: any}, {}> = createAsyncThunk<any, {data: any}>(
    "POST/articleSend",
    async (data,_) => {
    console.log('sendArticle', data)
      return await RegistriesPublicService.sendArticlesPrice(data)
        .then((res: any) =>  'sucsess')
        .catch((err: any) => 'error');
    }
  );*/


const getArticles: AsyncThunk<any, { uuid: number | string }, {}> = createAsyncThunk<any, { uuid: number | string }>(
  "GET/articles",
  async (params) => {
    console.log(params);
    return     await RegistriesPublicService.getArticles(params.uuid)
    .then((res: any) => res.data)
    .catch((err: any) => []);
}
);


const getZip: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/getZip",
  async () => {
    return     await RegistriesPublicService.getZip()
    .then((res: any) => {return res.data})
    .catch((err: any) => []);
}
);


export {
  sendArticle,
  getArticles,
  getZip
};
