import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const network =
  process.env.APTOS_NETWORK === "MAINNET"
    ? Network.MAINNET
    : Network.DEVNET;

export const aptos = new Aptos(
  new AptosConfig({ network })
);
