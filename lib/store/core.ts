/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
export interface InitialCoreStateProps {
}

//////////////////////////////////////////////////////////////

const initialState: InitialCoreStateProps = {
 
};

export const coreSlice = createSlice({
    name: "core",
    initialState,
    reducers: {
      
    },
});

export const {
 
} = coreSlice.actions;

export const selectCore = (state: { core: InitialCoreStateProps }) => state.core;
