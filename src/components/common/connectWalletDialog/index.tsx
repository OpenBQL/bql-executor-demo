import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import { create, useModal } from "@ebay/nice-modal-react";
import Dialog from "../dialog";
import { RootState } from "@/store";
import { wallets } from "@/config/wallets";

type TypeProps = {
  title?: string;
  type?: string;
};
const ConnectNetworkDialog = create(({ title, type }: TypeProps) => {
  const { visible, hide } = useModal();
  const walletMsg = useSelector((state: RootState) => state.wallet.walletMsg);
  const { chainId } = walletMsg;

  useEffect(() => {
    if (chainId) hide();
  }, [chainId, hide]);

  const wrapWallets = type
    ? wallets.filter((item) => item.network === type)
    : wallets;

  return (
    <>
      <Dialog title={title || "Select a Wallet"} open={visible} onClose={hide}>
        <Grid
          container
          spacing={10}
          mt={{ xs: 5, md: 20 }}
          px={0}
          maxWidth={560}
        >
          {wrapWallets.map(({ name, logo, connect }, index: number) => (
            <Grid
              item
              xs={12}
              md={4}
              key={index}
              sx={{
                cursor: "pointer",
              }}
            >
              <ListItemButton
                sx={{
                  display: "flex",
                  "&:hover": { bgcolor: "common.darkBrown2" },
                  px: 40,
                  flexDirection: { xs: "row", md: "column" },
                  alignItems: "center",
                }}
                onClick={() => {
                  connect();
                }}
              >
                <ListItemIcon
                  sx={{
                    pt: { xs: 6, md: 8 },
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: { xs: "block", md: "none" } }}>
                    <Image src={logo} width={30} height={30} alt="" />
                  </Box>
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Image src={logo} width={40} height={40} alt="" />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  sx={{
                    mt: { xs: 0, md: 14 },
                    textAlign: "center",
                    width: { xs: "auto", md: 90 },
                  }}
                  primary={name}
                />
              </ListItemButton>
            </Grid>
          ))}
        </Grid>
      </Dialog>
    </>
  );
});

export default ConnectNetworkDialog;
