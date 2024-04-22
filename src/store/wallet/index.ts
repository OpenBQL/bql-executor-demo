import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface IWalletMsg {
  name: string;
  account: string;
  chainId: null | number;
  provider: any;
  isSupportedChain: boolean;
}

export interface walletState {
  walletMsg: IWalletMsg;
}

const initialState: walletState = {
  walletMsg: {
    name: "",
    account: "",
    chainId: null,
    provider: null,
    isSupportedChain: true,
  },
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateWallet: (state, action: PayloadAction<IWalletMsg>) => {
      state.walletMsg = { ...state.walletMsg, ...action.payload };
      localStorage.setItem("currentWalletName", action.payload.name);
    },
  },
});

export const { updateWallet } = walletSlice.actions;
export default walletSlice.reducer;
