import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store"

interface AnsweredQuestion {
    question: string;
    correctAnswer: string;
    isCorrect: boolean;
    id: number| string
}

interface AppQuizState {
    answeredQuestions: AnsweredQuestion[];
}

const initialState: AppQuizState = {
    answeredQuestions: [],
}

export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        addAnsweredQuestions: (state, action: PayloadAction<AnsweredQuestion>) => {
            state.answeredQuestions.push(action.payload);
        },
        resetAnsweredQuestions: (state) => {
            state.answeredQuestions = [];
        },
    }
});

export const { addAnsweredQuestions, resetAnsweredQuestions } = questionSlice.actions;

export const selectAnswerQuestions = (state: RootState) => state.question.answeredQuestions
export default questionSlice.reducer;