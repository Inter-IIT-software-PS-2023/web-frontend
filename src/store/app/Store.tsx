import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../../store/features/themeToggle/Toggle'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import sessionStorage from 'redux-persist/lib/storage/session'
const persistConfig: any = {
    key: 'root',
    storage: sessionStorage,
}

const persistedReducer = persistReducer(persistConfig, themeReducer)

export const store = configureStore({
    reducer: {
        theme: persistedReducer,
    },
    middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)