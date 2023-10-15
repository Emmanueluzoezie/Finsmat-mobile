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
    question: string;
    friendDetails: SelectFriendType
    selectedFriend: boolean 
    quizTypeOfUser: string
    quiz_id: string
}

const initialState: AppQuizState = {
    answeredQuestions: [],
    question: "Saving",
    friendDetails: {
        friend_id: "",
        friend_name: "",
    },
    selectedFriend: false,
    quizTypeOfUser: "challenger",
    quiz_id: ""
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
        setQuestion: (state, action: PayloadAction<string>) => {
            state.question = action.payload;
        },
        setSelectedFriend: (state, action: PayloadAction<boolean>) => {
            state.selectedFriend = action.payload;
        },
        setFriendDetails: (state, action: PayloadAction<SelectFriendType>) => {
            state.friendDetails = action.payload;
        },
        setQuizTypeOfUser: (state, action: PayloadAction<string>) => {
            state.quizTypeOfUser = action.payload;
        },
        setQuizId: (state, action: PayloadAction<string>) => {
            state.quiz_id = action.payload;
        },
    }
});

export const { addAnsweredQuestions, resetAnsweredQuestions, setQuestion, setFriendDetails, setSelectedFriend, setQuizTypeOfUser, setQuizId } = questionSlice.actions;

export const selectAnswerQuestions = (state: RootState) => state.question.answeredQuestions
export const selectQuestion = (state: RootState) => state.question.question
export const selectedFriendForQuiz = (state: RootState) => state.question.selectedFriend
export const selectFriendDetails = (state: RootState) => state.question.friendDetails
export const selectQuizTypeOfUser = (state: RootState) => state.question.quizTypeOfUser
export const selectQuizId = (state: RootState) => state.question.quiz_id
export default questionSlice.reducer;