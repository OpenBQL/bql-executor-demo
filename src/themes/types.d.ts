import type { IThemeColor } from './ColorOptions'
declare module '@mui/material/styles/createPalette' {
  interface CommonColors extends IThemeColor {
    black: string
    white: string
  }
}
