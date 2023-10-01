import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { appSlice } from '../slice/AppSlices';
import { questionSlice } from '../slice/QuizSlice';
import { screenSlice } from '../slice/ScreenSlice';
import { userSlice } from '../slice/userSlice';
import { welcomeSlice } from '../slice/welcomeSlice';



export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        screen: screenSlice.reducer,
        user: userSlice.reducer,
        welcome: welcomeSlice.reducer,
        question: questionSlice.reducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),

})

export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch