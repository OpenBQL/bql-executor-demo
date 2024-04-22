import { bqlNetwork } from "@/config/blockchain";

export function toHex(number: number): string {
  return "0x" + number.toString(16);
}
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address?.substring(0, chars + 1)}...${address?.substring(
    address.length - chars
  )}`;
}

export function getNetworkType(chain: string | number) {
  if (typeof chain === "string") {
    if (chain?.includes("solana")) {
      return "solana";
    } else {
      return "evm";
    }
  } else {
    if (chain === 801) {
      return "solana";
    } else {
      return "evm";
    }
  }
}

export const validateStructure = (jsObj, setError) => {
  if (
    typeof jsObj === "object" &&
    Object.prototype.toString.call(jsObj) === "[object Object]"
  ) {
    if (!jsObj.hasOwnProperty("workflow")) {
      setError('"workflow" field is required.');
      return;
    } else {
      if (!Array.isArray(jsObj.workflow)) {
        setError('"workflow" must be an array.');
        return;
      } else {
        if (
          !jsObj.workflow.every(
            (item) =>
              typeof item === "object" &&
              item !== null &&
              "action" in item &&
              typeof item.action === "object" &&
              item.action !== null &&
              "network" in item.action &&
              "protocol" in item.action &&
              "contract" in item.action &&
              "call" in item.action
          )
        ) {
          setError(
            `Each item in the "workflow" array must have
    action:
      network: 'xx'
      protocol: 'xx'
      contract: 'xx'
      call: 'xx'`
          );
          return;
        } else {
          setError("");
        }
      }
      if (
        !jsObj.workflow.every((item) => {
          const supportNetwork = bqlNetwork.map((item) => item.value);
          return supportNetwork.includes(item.action.network);
        })
      ) {
        const supportNetwork = bqlNetwork.map((item) => item.value);
        setError(
          `The value of "network" field is supported only for these values: \n${supportNetwork.join(
            ","
          )}`
        );
        return;
      }
    }
  } else {
    setError('"workflow" field is required.');
  }
};
