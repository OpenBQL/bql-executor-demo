import store from "@/store";
import { toHex } from "@/utils";
import { updateWallet } from "@/store/wallet";
import { blockchain } from "@/config/blockchain";
import { walletsName } from ".";

const { dispatch } = store;
const queryState = async () => {
  const ethereum = window.ethereum;
  const accounts = await ethereum.request({ method: "eth_accounts" });
  const account = accounts[0] || null;
  const chainId = await ethereum.request({ method: "eth_chainId" });
  const isSupportedChain = Object.keys(blockchain).includes(
    Number(chainId).toString()
  );
  const isValid = localStorage.getItem("isDisconnect") === "0";

  if (isSupportedChain && account && isValid) {
    dispatch(
      updateWallet({
        name: walletsName.metamask,
        chainId: Number(chainId),
        account,
        provider: ethereum,
        isSupportedChain,
      })
    );
  } else {
    dispatch(
      updateWallet({
        name: walletsName.metamask,
        chainId: null,
        account: "",
        provider: null,
        isSupportedChain,
      })
    );
  }
};

const callQueryState = async () => {
  await queryState();
};

const initMetaMask = async () => {
  const ethereum = window.ethereum;
  try {
    if (!ethereum) return;
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0] || null;
    if (account) {
      await queryState();
    }
    ethereum.on("accountsChanged", callQueryState);
    ethereum.on("chainChanged", callQueryState);
  } catch (error) {
    console.error(error);
  }
};

const connectMetaMask = async () => {
  const ethereum = window.ethereum;
  if (!ethereum) {
    window.open("https://metamask.io/download/");
  } else {
    try {
      localStorage.setItem("isDisconnect", "0");
      await ethereum.request({ method: "eth_requestAccounts" });
      await queryState();
      ethereum.on("accountsChanged", callQueryState);
      ethereum.on("chainChanged", callQueryState);
    } catch (error) {
      console.error(error);
    }
  }
};

const toggleChainMetaMask = async (
  param: any,
  account: string,
  chainId: number
) => {
  const ethereum = window.ethereum;
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(chainId) }],
      account,
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to Wallet.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [param],
          account,
        });
      } catch (addError) {
        // handle "add" error
      }
    }
  }
};

export { initMetaMask, connectMetaMask, toggleChainMetaMask };
