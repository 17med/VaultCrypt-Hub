console.log("Hello via Bun!");
import { Aptos, AptosConfig, Network ,Account} from "@aptos-labs/ts-sdk";
const config = new AptosConfig({
  network: Network.TESTNET,
  httpOptions: {
    allowHttp1: true,
  },
});

const aptos = new Aptos(config);

async function main() {
  const newAccount = Account.generate();

    console.log(`New account address: ${newAccount.accountAddress}`);
    console.log(`New account public key: ${newAccount.publicKey}`);
    console.log(`New account private key (use with caution): ${newAccount.privateKey}`);
}

main();
