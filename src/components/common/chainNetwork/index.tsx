import { Box, ButtonProps, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { walletToggleChain } from "@/config/wallets";
import { networkIcon } from "@/config/blockchain";
import { show } from "@ebay/nice-modal-react";
import ChainNetworkDialog from "../chainNetworkDialog";

export type IChainNetworkProps = {
  label?: React.ReactNode;
} & ButtonProps;
const ChainNetwork: React.FC<IChainNetworkProps> = ({ label, ...rest }) => {
  const dispatch = useDispatch();
  const { name, chainId, isSupportedChain } = useSelector(
    (state: RootState) => state.wallet.walletMsg
  );

  const onClick = () => {
    if (name && walletToggleChain[name].toggleChain) {
      show(ChainNetworkDialog);
    }
    if (!isSupportedChain) {
      show(ChainNetworkDialog);
    }
  };
  return (
    <IconButton
      onClick={onClick}
      color="primary"
      variant="contained"
      {...rest}
      sx={{
        textTransform: "initial",
      }}
    >
      {label === "Wrong Network" ? (
        <Box
          component={"img"}
          src={"/imgs/common/warning.svg"}
          width={30}
          height={30}
          borderRadius="50%"
        />
      ) : (
        <Box
          component={"img"}
          src={networkIcon[chainId]}
          width={30}
          height={30}
          borderRadius="50%"
        />
      )}
    </IconButton>
  );
};

export default ChainNetwork;
