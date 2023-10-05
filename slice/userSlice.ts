import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store"


interface AppUserState {
    key: any;
    userInfo: any;
    console: any;
    web3auth: any;
    userId: string;
    userPoints: number;
    userRank: number
}

const initialState: AppUserState = {
    key: "",
    userInfo: "",
    console: "",
    web3auth: null,
    userId: "",
    userPoints: 0,
    userRank: 0
}

export const userSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
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
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setUserPoints: (state, action: PayloadAction<number>) => {
            state.userPoints = action.payload;
        },
        setUserRank: (state, action: PayloadAction<number>) => {
            state.userRank = action.payload;
        },
    }
});

export const { setKey, setUserInfo, setConsole, setWeb3Auth, setUserId, setUserRank } = userSlice.actions;

export const selectKey = (state: RootState) => state.user.key
export const selectUserInfo = (state: RootState) => state.user.userInfo
export const selectConsole = (state: RootState) => state.user.console;
export const selectWeb3Auth = (state: RootState) => state.user.web3auth;
export const selectUserId = (state: RootState) => state.user.userId;
export const selectUserPoints = (state: RootState) => state.user.userPoints;
export const selectUserRank = (state: RootState) => state.user.userRank;

export default userSlice.reducer;



