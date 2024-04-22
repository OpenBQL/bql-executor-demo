import { walletsName } from ".";
import store from "@/store";
import { updateWallet } from "@/store/wallet";
import { blockchain } from "@/config/blockchain";

const { dispatch } = store;
const queryState = async () => {
  const provider = getProvider();
  if (!provider.isConnected) {
    connectSolana();
    return;
  }

  const account = provider.publicKey.toString();
  const chainId = 801;
  const isSupportedChain = Object.keys(blockchain).includes(
    Number(chainId).toString()
  );
  const isValid = localStorage.getItem("isDisconnect") === "0";

  if (isSupportedChain && account && isValid) {
    dispatch(
      updateWallet({
        name: walletsName.phantom,
        chainId: Number(chainId),
        account,
        provider,
        isSupportedChain,
      })
    );
  } else {
    dispatch(
      updateWallet({
        name: walletsName.phantom,
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

const initSolana = async () => {
  const onWindowLoaded = async () => {
    const provider = window.phantom?.solana;
    try {
      if (!provider) return;
      await queryState();
      provider.on("accountsChanged", callQueryState);
    } catch (error) {}
  };

  window.onload = () => {
    onWindowLoaded();
  };
};

const connectSolana = async () => {
  const provider = getProvider();
  try {
    localStorage.setItem("isDisconnect", "0");
    const resp = await provider.connect({ onlyIfTrusted: false });
    if (resp.publicKey.toString()) {
      queryState();
      provider.on("accountsChanged", callQueryState);
    }
  } catch (err) {}
};

const getProvider = () => {
  if ("phantom" in window) {
    const provider = window.phantom?.solana;
    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open("https://phantom.app/", "_blank");
};
export { initSolana, connectSolana };
