import {
    ActionReducerMapBuilder,
    createEntityAdapter,
    createSlice,
    EntityAdapter,
    EntityState,
    Slice,
  } from "@reduxjs/toolkit";
  import {
    getArticles,
    getSubject
  } from "./articles.actions";
  
  const FEATURE_REGISTRIES_KEY: string = "articles";

  export interface  FeatureState {
    articles: any[];
    zip: any;
    subject:  any[];
    openCreateArticles:  boolean;
    openCreateArticlesPrice:  {open: boolean, data?:  any, flag?: string };
    openSucessModal:  boolean;
    openCreateSubject:  boolean;
    loading: boolean;
  }

  const initialState: FeatureState = {
    articles: [],
    zip: "",
    subject:  [],
    openCreateArticles:  false,
    openCreateArticlesPrice:  {open: false, data: "", flag: ""},
    openSucessModal:  false,
    openCreateSubject:   false,
    loading: false,
  };
  
  const articlesSlice: Slice<FeatureState> = createSlice({
    name: FEATURE_REGISTRIES_KEY,
    initialState: initialState,
    reducers: {
      setopenModalCreateArtical: (state,{payload}) => ({
        ...state,
        openCreateArticles: payload,
      }),
      setopenModalCreateArticalPrice: (state,{payload}) => ({
        ...state,
        openCreateArticlesPrice: payload,
      }),
      setOpenSucessModal: (state,{payload}) => ({
        ...state,
        openSucessModal: payload,
      }),
      

      setopenModalCreateSubject: (state,{payload}) => ({
        ...state,
        openCreateSubject: payload,
      }),
      //custom
     },
     extraReducers: (builder) => {
      getAsyncArticles(builder);
      getAsyncSubject(builder);
    },
    }
  )
  
  export const {
    increment,
    setopenModalCreateArtical,
    setopenModalCreateArticalPrice,
    setOpenSucessModal,
    setopenModalCreateSubject
  } = articlesSlice.actions;
  
  export default articlesSlice.reducer;


  function getAsyncArticles(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getArticles.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      articles: payload,
    }));
    builder.addCase(getArticles.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getArticles.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      articles: [],
      error: (payload as any).error,
    }));
  }
  

  function getAsyncSubject(builder: ActionReducerMapBuilder<FeatureState>) {
    builder.addCase(getSubject.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      subject: payload,
    }));
    builder.addCase(getSubject.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getSubject.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      subject: [],
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
  