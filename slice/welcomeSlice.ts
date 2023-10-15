import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store"


interface CurrencyInfo {
    country: string;
    name: string;
    symbol:  string
}

interface AppWelcomeState {
    currencyInfo: CurrencyInfo
    showResult: boolean
    nameOfItem: string
    welcomeAmount: string
    timeTreat: string
}

const initialState: AppWelcomeState = {
    currencyInfo: {
        country: "Nigeria",
        name: "NGN",
        symbol: "₦"
    },
    showResult: false,
    nameOfItem: "Junk",
    welcomeAmount: "",
    timeTreat: "Daily",
}

export const welcomeSlice = createSlice({
    name: "welcome",
    initialState,
    reducers: {
        setCurrencyInfo: (state, action: PayloadAction<CurrencyInfo>) => {
            state.currencyInfo = action.payload;
        },
        setShowResult: (state, action: PayloadAction<boolean>) => {
            state.showResult = action.payload;
        },
        setNameOfItem: (state, action: PayloadAction<string>) => {
            state.nameOfItem = action.payload;
        },
        setWelcomeAmount: (state, action: PayloadAction<string>) => {
            state.welcomeAmount = action.payload;
        },
        setTreatTimes: (state, action: PayloadAction<string>) => {
            state.timeTreat = action.payload;
        },
    }
});

export const { setCurrencyInfo, setShowResult, setWelcomeAmount, setNameOfItem, setTreatTimes } = welcomeSlice.actions;

export const selectedCurrencyInfo = (state: RootState) => state.welcome.currencyInfo
export const selectShowResult = (state: RootState) => state.welcome.showResult
export const selectTotalResult = (state: RootState) => state.welcome.showResult
export const selectNameOfItem = (state: RootState) => state.welcome.nameOfItem
export const selectWelcomeAmount = (state: RootState) => state.welcome.welcomeAmount
export const selectTreatTime = (state: RootState) => state.welcome.timeTreat
export default welcomeSlice.reducer;



