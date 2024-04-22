/* eslint-disable import/no-default-export */

declare interface Window {
  ethereum?: any;
  phantom?: any;
}

declare module "*.css" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}
