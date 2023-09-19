import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { appSlice } from '../slice/AppSlices';



export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),

})

export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch