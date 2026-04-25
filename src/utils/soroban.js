const CONTRACT_ID =
  import.meta.env.VITE_CONTRACT_ID || "PASTE_DEPLOYED_CONTRACT_ID_HERE";

const STORAGE_KEY = "split-bill-balances";

function readStore() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

function writeStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function toBalanceList(store) {
  return Object.entries(store).map(([user, amount]) => ({ user, amount }));
}

// Reads current balances (replace with Soroban RPC read in production).
export async function getBalances() {
  return toBalanceList(readStore());
}

// Sends add_expense intent (replace with wallet-signed Soroban tx in production).
export async function addExpense(_sourcePublicKey, payer, amount, participants) {
  const store = readStore();
  const cleanParticipants = participants.filter(Boolean);

  if (!cleanParticipants.length) {
    throw new Error("Participants are required");
  }

  const share = Math.floor(amount / cleanParticipants.length);
  if (share * cleanParticipants.length !== amount) {
    throw new Error("Amount must be divisible by number of participants");
  }

  for (const participant of cleanParticipants) {
    if (!(participant in store)) store[participant] = 0;
    if (participant !== payer) {
      store[participant] -= share;
      store[payer] = (store[payer] || 0) + share;
    }
  }

  writeStore(store);
  return { ok: true, mode: "local-mock", contractId: CONTRACT_ID };
}

// Sends settlement intent (replace with wallet-signed Soroban tx in production).
export async function settleBalance(_sourcePublicKey, from, to, amount) {
  const store = readStore();
  store[from] = (store[from] || 0) + amount;
  store[to] = (store[to] || 0) - amount;
  writeStore(store);
  return { ok: true, mode: "local-mock", contractId: CONTRACT_ID };
}

export function getContractConfig() {
  return { CONTRACT_ID };
}
