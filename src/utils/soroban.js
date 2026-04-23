import { Server } from "soroban-client";

const server = new Server("https://soroban-testnet.stellar.org");

const CONTRACT_ID = "CCDMP6ZPOE4TXHAODMU4RA4HTQRM4NLP4Q4FTBU2C4ERBNNVHTN2E44Z"; // replace after deploy

export async function addExpense(payer, amount, participants) {
  console.log("Calling contract...");
  console.log(payer, amount, participants);

  // NOTE: For hackathon demo, this is mocked
  // You can extend with real tx building later
}

export async function getBalances() {
  console.log("Fetching balances...");
}