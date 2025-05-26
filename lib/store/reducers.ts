/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { coreSlice } from "./core";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window === "undefined" ? createNoopStorage() : createWebStorage("local");

const AccountPersistConfig = {
    key: "core",
    storage,
    whitelist: [],
};

const corePersistReducer = persistReducer(AccountPersistConfig, coreSlice.reducer);

const reducers = combineReducers({
    core: corePersistReducer,
});

export default reducers;
