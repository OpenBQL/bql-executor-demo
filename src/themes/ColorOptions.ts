export const ColorOptions = {
  light: {
    body: "#F7F7F7",
    body2: "#F0F0F0",
    body3: "#FFF",
    bodyDark: "#0C0C0C",
    text: "#0A0A0A",
    text2: "rgba(10, 10, 10, 0.50)",
    text3: "rgba(10, 10, 10, 0.30)",
    border: "rgba(10, 10, 10, 0.12)",
    border2: "rgba(10, 10, 10, 0.50)",
    green: "#428737",
    green2: "#0CBB7D",
    yellow: "#CA9824",
    yellow2: "#EBBC42",
    cyan: "#37948E",
    cyan2: "#35AEA7",
    brown: "#B05733",
    red: "#EB4242",
  },
};

export type IThemeColor = typeof ColorOptions.light;

export default ColorOptions;
