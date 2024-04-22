import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./wallet";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "payload.library",
          "payload.provider",
          "wallet.connector",
          "payload",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "payload.library",
          "payload.provider",
          "wallet.connector",
          "payload",
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          "wallet.walletMsg.library",
          "wallet.walletMsg.provider",
          "wallet.connector",
          "payload",
        ],
      },
    }),
  reducer: {
    wallet: walletReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
