import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import UserReducer from './user'

import { setupListeners } from "@reduxjs/toolkit/query";
import { API } from "./api";
const createNoopStorage = () => {
    return {
      getItem(_key: string) {
        return Promise.resolve(null);
      },
      setItem(_key: string, value: any) {
        return Promise.resolve(value);
      },
      removeItem(_key: string) {
        return Promise.resolve();
      },
    };
  };
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

const presistConfig = {
    key: 'root',
    storage: storage,
    blacklist: [API.reducerPath]
}


const rootReducer = combineReducers({
  user: UserReducer, // make similar import like this
  [API.reducerPath]: API.reducer
})

const persistedReducer = persistReducer(presistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(API.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

export default store