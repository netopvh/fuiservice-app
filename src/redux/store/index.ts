import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/userApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import themeConfigSlice from "./slices/themeConfig";
import { dashboardApi } from "../services/dashboardApi";
import { companyVisitApi } from "../services/companyVisitApi";
import { productsApi } from "../services/productsApi";
import { productCategoryApi } from "../services/productCategoryApi";
import { companyApi } from "../services/companyApi";
import { tripsApi } from "../services/tripsApi";

export const store = configureStore({
  reducer: {
    themeConfig: themeConfigSlice,
    [userApi.reducerPath]: userApi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [companyVisitApi.reducerPath]: companyVisitApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [productCategoryApi.reducerPath]: productCategoryApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      tripsApi.middleware,
      dashboardApi.middleware,
      companyApi.middleware,
      companyVisitApi.middleware,
      productsApi.middleware,
      productCategoryApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
