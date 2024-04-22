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
import {
  blockchain,
  networkIcon,
  networkParam,
  wrapBlockchain,
} from "@/config/blockchain";
import { walletToggleChain } from "@/config/wallets";

type TypeProps = {
  title?: string;
};
const ChainNetworkDialog = create(({ title }: TypeProps) => {
  const { visible, hide } = useModal();
  const walletMsg = useSelector((state: RootState) => state.wallet.walletMsg);
  const { account, chainId, name, isSupportedChain } = walletMsg;

  useEffect(() => {
    if (chainId) hide();
  }, [chainId, hide]);

  if ((!name && isSupportedChain) || !walletToggleChain[name]) return <></>;
  const { supportChains = [], toggleChain } = walletToggleChain[name];

  return (
    <>
      <Dialog title={title || "Select a Network"} open={visible} onClose={hide}>
        <Grid
          container
          spacing={10}
          mt={{ xs: 5, md: 20 }}
          px={0}
          maxWidth={560}
        >
          {supportChains.map((id: number, index: number) => (
            <Grid
              item
              xs={12}
              md={3}
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
                  backgroundColor: id === chainId ? "var(--so-darkBrown2)" : "",
                  flexDirection: { xs: "row", md: "column" },
                  alignItems: "center",
                }}
                onClick={() => {
                  if (id === chainId) return;
                  toggleChain(networkParam[id], account, id);
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
                    <Image
                      src={networkIcon[id]}
                      width={30}
                      height={30}
                      alt=""
                    />
                  </Box>
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Image
                      src={networkIcon[id]}
                      width={40}
                      height={40}
                      alt=""
                    />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  sx={{
                    mt: { xs: 0, md: 14 },
                    textAlign: "center",
                    width: { xs: "auto", md: 90 },
                  }}
                  primary={wrapBlockchain[blockchain[id]]}
                />
              </ListItemButton>
            </Grid>
          ))}
        </Grid>
      </Dialog>
    </>
  );
});

export default ChainNetworkDialog;
