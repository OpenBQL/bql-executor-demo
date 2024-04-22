import React from "react";
import Image from "next/image";
import {
  Box,
  Dialog as MuiDialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./styles";

export type IDialogProps = {
  hasClose?: boolean;
  title?: string;
  open: boolean;
  onClose: any;
  children?: React.ReactNode;
  sx?: any;
};

const Dialog: React.FC<IDialogProps> = (props) => {
  const { hasClose = true, title, open, onClose, children, sx = {} } = props;
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      sx={[{ ...styles.root }, sx && { ...sx }]}
    >
      {hasClose && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 1000,
            top: { xs: 12, md: 16 },
            right: { xs: 8, md: 12 },
          }}
        >
          <IconButton sx={styles.close} onClick={onClose}>
            <Image
              src={"/imgs/common/dialog_close.svg"}
              width={20}
              height={20}
              alt="close"
            ></Image>
          </IconButton>
        </Box>
      )}
      <DialogContent sx={{ position: "relative" }}>
        <Stack direction="row">
          <Box flex={1} pt={18}>
            {title && (
              <Typography sx={{ pr: 30, fontSize: { xs: 20, md: 24 } }}>
                {title}
              </Typography>
            )}
            <Box id="so-dialog-content">{children}</Box>
          </Box>
        </Stack>
      </DialogContent>
    </MuiDialog>
  );
};

export default Dialog;
