import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import MuiThemeProvider from "../themes";
import { Provider } from "react-redux";
import store from "@/store";
import NiceModal from "@ebay/nice-modal-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import Header from "@/components/common/header";
import { useEffect, useState } from "react";
import { walletToggleChain } from "@/config/wallets";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  const [currentWalletName, setCurrentWalletName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("currentWalletName");
    setCurrentWalletName(name);
    if (currentWalletName) {
      if (walletToggleChain[currentWalletName]) {
        const { init } = walletToggleChain[currentWalletName];
        init && init();
      }
    }
  }, [currentWalletName]);

  return (
    <Provider store={store}>
      <AppCacheProvider {...props}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>bql executor demo</title>
        </Head>
        <MuiThemeProvider>
          <NiceModal.Provider>
            <ToastContainer />
            <Header />
            <Component {...pageProps} />
          </NiceModal.Provider>
        </MuiThemeProvider>
      </AppCacheProvider>
    </Provider>
  );
}
