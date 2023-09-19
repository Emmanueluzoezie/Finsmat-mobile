import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store"


interface AppState {
    isUserLogin: boolean;
    appTheme: string;
    currentScreen: string;
    openOtpScreen: boolean;
    key: any;
    userInfo: any;
    console: any;
    web3auth: any;
}

const initialState: AppState = {
    isUserLogin: true,
    appTheme: "dark",
    currentScreen: "home",
    openOtpScreen: false,
    key: "",
    userInfo: "",
    console: "",
    web3auth: null
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setIsUserLogin: (state, action: PayloadAction<boolean>) => {
            state.isUserLogin = action.payload;
        },
        setAppTheme: (state, action: PayloadAction<string>) => {
            state.appTheme = action.payload;
        },
        setKey: (state, action: PayloadAction<any>) => {
            state.key = action.payload;
        },
        setUserInfo: (state, action: PayloadAction<any>) => {
            state.userInfo = action.payload;
        },
        setConsole: (state, action: PayloadAction<any>) => {
            state.console = action.payload;
        },
        setWeb3Auth: (state, action: PayloadAction<any>) => {
            state.web3auth = action.payload;
        },
        setCurrentScreen: (state, action: PayloadAction<string>) => {
            state.currentScreen = action.payload;
        },
        setOpenOtpScreen: (state, action: PayloadAction<boolean>) => {
            state.openOtpScreen = action.payload;
        },
    }
});

export const { setIsUserLogin, setAppTheme, setCurrentScreen, setOpenOtpScreen, setKey, setUserInfo, setConsole, setWeb3Auth } = appSlice.actions;

export const selectIsUserLogin = (state: RootState) => state.app.isUserLogin;
export const selectAppTheme = (state: RootState) => state.app.appTheme;
export const selectKey = (state: RootState) => state.app.key;
export const selectUserInfo = (state: RootState) => state.app.userInfo;
export const selectConsole = (state: RootState) => state.app.console;
export const selectWeb3Auth = (state: RootState) => state.app.web3auth;
export const selectCurrentScreen = (state: RootState) => state.app.currentScreen;
export const selectOpenOtpScreen = (state: RootState) => state.app.openOtpScreen;

export default appSlice.reducer;


    
