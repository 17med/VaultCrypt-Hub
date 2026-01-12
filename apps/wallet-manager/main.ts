import { createNormalWallet } from "./wallet.ts";
import { aptos } from "./config.ts";

async function main() {
    console.log("--- 1. Generating Accounts ---");
    const accountA = createNormalWallet();
    const accountB = createNormalWallet();
    
    console.log(`Account A (Sender):   ${accountA.address}`);
    console.log(`Account B (Receiver): ${accountB.address}`);

    try {
        // --- 2. Funding Account A ---
        // 1 APT = 100,000,000 Octas
        console.log("\n--- 2. Funding Account A with 5 APT ---");
        await aptos.fundAccount({
            accountAddress: accountA.address,
            amount: 500_000_000, 
        });
        console.log("Funding successful.");

        // --- 3. Sending 2 APT to Account B ---
        const amountToSend = 200_000_000; 
        console.log(`\n--- 3. Sending ${amountToSend / 1e8} APT to Account B ---`);
        
        // Build the transaction
        const transaction = await aptos.transaction.build.simple({
            sender: accountA.address,
            data: {
                function: "0x1::aptos_account::transfer",
                functionArguments: [accountB.address, amountToSend],
            },
        });

        // Sign and Submit
        const pendingTxn = await aptos.signAndSubmitTransaction({
            signer: accountA.account,
            transaction,
        });

        console.log(`Transaction submitted! Hash: ${pendingTxn.hash}`);

        // Wait for completion
        await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
        console.log("Transaction confirmed!");

        // --- 4. Final Balance Check ---
        console.log("\n--- 4. Final Balances ---");
        const balanceA = await aptos.getAccountAPTAmount({ accountAddress: accountA.address });
        const balanceB = await aptos.getAccountAPTAmount({ accountAddress: accountB.address });
        
        console.log(`Account A: ${balanceA / 1e8} APT`);
        console.log(`Account B: ${balanceB / 1e8} APT`);

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main().catch(console.error);