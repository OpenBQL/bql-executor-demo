import { show } from "@ebay/nice-modal-react";
import { Button, ButtonProps } from "@mui/material";
import React from "react";
import ConnectNetworkDialog from "../connectWalletDialog";

export type IConnectWalletProps = {
  label?: React.ReactNode;
} & ButtonProps;
const ConnectWallet: React.FC<IConnectWalletProps> = ({
  label = "Connect Wallet",
  sx,
  ...rest
}) => {
  const onClick = () => {
    show(ConnectNetworkDialog);
  };

  return (
    <Button
      onClick={onClick}
      color="info"
      variant="contained"
      {...rest}
      sx={{
        height: { xs: 32, md: 40 },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};

export default ConnectWallet;
