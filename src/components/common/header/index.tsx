import { walletsIcon, walletsName } from "@/config/wallets";
import { RootState } from "@/store";
import { updateWallet } from "@/store/wallet";
import { Box, Container, Popover, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChainNetwork from "../chainNetwork";
import ConnectWallet from "../connectWallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { shortenAddress } from "@/utils";

export type IHeaderProps = {};

const Header: React.FC<IHeaderProps> = ({}) => {
  const dispatch = useDispatch();
  const { walletMsg } = useSelector((state: RootState) => state.wallet);
  const { account, name, provider, isSupportedChain } = walletMsg;

  const walletLogo = walletsIcon[name];

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const disconnectFun = () => {
    if (name === walletsName.phantom) {
      provider.disconnect();
    }
    dispatch(
      updateWallet({
        name: "",
        account: "",
        chainId: null,
        provider: null,
        isSupportedChain: true,
      })
    );
    localStorage.setItem("isDisconnect", "1");
    localStorage.setItem("currentWalletName", "");
  };

  return (
    <Stack sx={{ bgcolor: "var(--so-body2)" }}>
      <Container>
        <Stack sx={{ alignItems: "end", py: 10 }}>
          <Stack direction="row" alignItems="center" spacing={15}>
            {isSupportedChain && account ? (
              <ChainNetwork sx={{ fontSize: { xs: 14, md: 18 } }} />
            ) : (
              isSupportedChain && (
                <ConnectWallet
                  sx={{
                    fontSize: { xs: 14, md: 16 },
                    px: { xs: 8, md: 16 },
                    py: { xs: 3, md: 4 },
                  }}
                ></ConnectWallet>
              )
            )}
            {!isSupportedChain && (
              <ChainNetwork
                label="Wrong Network"
                sx={{
                  fontSize: { xs: 14, md: 18 },
                  backgroundColor: "var(--so-brown)",
                  "&:hover": {
                    backgroundColor: "#b8613f",
                  },
                }}
              ></ChainNetwork>
            )}
            {account && (
              <>
                <AccountCircleIcon
                  onClick={handleClick}
                  sx={{ cursor: "pointer", width: 36, height: 36 }}
                />
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{ transform: "translateY(30px)" }}
                >
                  <Stack
                    onClick={handleClose}
                    sx={{ border: "1px solid", borderColor: "common.border" }}
                  >
                    <Stack
                      spacing={10}
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      sx={{ px: 10, py: 10 }}
                    >
                      <Typography>{shortenAddress(account)}</Typography>
                      <Box
                        component={"img"}
                        src={walletLogo}
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                        }}
                      />
                    </Stack>

                    <Box
                      onClick={disconnectFun}
                      sx={{
                        px: 10,
                        py: 10,
                        cursor: "pointer",
                        ":hover": { bgcolor: "var(--so-body)" },
                      }}
                    >
                      Disconnect
                    </Box>
                  </Stack>
                </Popover>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Header;
