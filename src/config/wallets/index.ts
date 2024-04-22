import getConfig from "next/config";
import { connectMetaMask, initMetaMask, toggleChainMetaMask } from "./metamask";
import { connectSolana, initSolana } from "./solana";

export const {
  NODE_ENV_API = "dev",
}: { NODE_ENV_API: "dev" | "test" | "pro" } = getConfig().publicRuntimeConfig;

export const walletsName = {
  metamask: "MetaMask",
  phantom: "Phantom",
};

export const walletsIcon: Record<string, string> = {
  MetaMask: "/imgs/web3/wallets/metamask.svg",
  Phantom: "/imgs/web3/wallets/phantom.svg",
};

export const wallets = [
  {
    name: walletsName.metamask,
    logo: "/imgs/web3/wallets/metamask.svg",
    connect: connectMetaMask,
    network: "evm",
  },
  {
    name: walletsName.phantom,
    logo: "/imgs/web3/wallets/phantom.svg",
    connect: connectSolana,
    network: "solana",
  },
];

export const evmBlockchainOrder = [
  1, 56, 97, 137, 250, 43114, 1313161554, 321, 66, 288, 42161, 4689, 324, 1030,
  12008, 534352, 59144, 8453, 10, 1101, 169, 196, 1116,
];

export const solanaBlockchainOrder = [];

export const walletToggleChain = {
  [walletsName.metamask]: {
    init: initMetaMask,
    supportChains: evmBlockchainOrder,
    toggleChain: toggleChainMetaMask,
  },
  [walletsName.phantom]: {
    init: initSolana,
    supportChains: solanaBlockchainOrder,
    toggleChain: null,
  },
};
