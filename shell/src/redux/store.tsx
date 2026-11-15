import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reduces/index';
import createWebStorage from 'redux-persist/es/storage/createWebStorage'
import {
  persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const storage = createWebStorage('local')

const persistConfig = {
  key: 'root', // Key for the persisted state in storage
  storage, // Storage engine (localStorage)
  whitelist: ['signin'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store)

export { persistor, store }