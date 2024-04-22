import { SxProps } from '@mui/material'

export default {
  root: {
    '& .MuiDialog-paper': {
      maxWidth: 730,
      borderRadius: 0,
      margin: 12,
      position: 'relative',
    },
    '& .MuiDialogContent-root': {
      backgroundColor: 'common.body2',
      color: 'common.text',
      pt: 22,
      pb: { xs: 30, md: 40 },
      pl: { xs: 16, md: 30 },
      pr: { xs: 16, md: 30 },
      border: 1,
      lineHeight: 'normal',
      letterSpacing: 'normal',
      borderColor: 'common.text',
    },
    // '& .MuiTouchRipple-root': {
    //   display: 'none',
    // },
  },
  close: {
    '&:hover': {
      backgroundColor: 'common.body3',
    },
  },
} as Record<string, SxProps>
