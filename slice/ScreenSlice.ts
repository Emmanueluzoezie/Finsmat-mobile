import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store"


interface AppScreenState {
    calculatorCurrentScreen: string
}

const initialState: AppScreenState = {
    calculatorCurrentScreen: "investment",
}

export const screenSlice = createSlice({
    name: "screen",
    initialState,
    reducers: {
        setCalculatorCurrentScreen: (state, action: PayloadAction<string>) => {
            state.calculatorCurrentScreen = action.payload;
        },
    }
});

export const { setCalculatorCurrentScreen } = screenSlice.actions;

export const selectCalculatorCurrentScreen = (state: RootState) => state.screen.calculatorCurrentScreen
export default screenSlice.reducer;



