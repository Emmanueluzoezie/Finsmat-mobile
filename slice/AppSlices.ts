import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store"


interface AppState {
    isUserLogin: boolean;
    newUser: boolean;
    appTheme: string;
    currentScreen: string;
    openOtpScreen: boolean;
    currentArticleScreen: string
    errorMessage: string;
}

const initialState: AppState = {
    isUserLogin: true,
    newUser: false,
    appTheme: "light",
    currentScreen: "home",
    openOtpScreen: false,
    currentArticleScreen: "latest_article",
    errorMessage: ""
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setIsUserLogin: (state, action: PayloadAction<boolean>) => {
            state.isUserLogin = action.payload;
        },
        setNewUser: (state, action: PayloadAction<boolean>) => {
            state.newUser = action.payload;
        },
        setAppTheme: (state, action: PayloadAction<string>) => {
            state.appTheme = action.payload;
        },
        setCurrentScreen: (state, action: PayloadAction<string>) => {
            state.currentScreen = action.payload;
        },
        setOpenOtpScreen: (state, action: PayloadAction<boolean>) => {
            state.openOtpScreen = action.payload;
        },
        setCurrentArticleScreen: (state, action: PayloadAction<string>) => {
            state.currentArticleScreen = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
    }
});

export const { setIsUserLogin, setNewUser, setAppTheme, setCurrentScreen, setOpenOtpScreen, setCurrentArticleScreen, setErrorMessage } = appSlice.actions;

export const selectIsUserLogin = (state: RootState) => state.app.isUserLogin;
export const selectNewUser = (state: RootState) => state.app.newUser;
export const selectAppTheme = (state: RootState) => state.app.appTheme;
export const selectCurrentScreen = (state: RootState) => state.app.currentScreen;
export const selectOpenOtpScreen = (state: RootState) => state.app.openOtpScreen;
export const selectCurrentArticleScreen = (state: RootState) => state.app.currentArticleScreen;
export const selectErrorMessage = (state: RootState) => state.app.errorMessage;

export default appSlice.reducer;


    
