# Split Bill dApp on Stellar Soroban

## 1. 🧠 Project Overview

Split Bill is a hackathon-friendly decentralized app that tracks shared group expenses on Stellar Soroban and computes net balances directly on-chain.

### Key features
- Add expense with payer, amount, and participant addresses.
- Compute balances (`+` means should receive, `-` means owes).
- Settle balances using Freighter wallet transaction signing.
- Read/write directly with Soroban RPC (no backend).
- Minimal React + Tailwind UI for fast iteration.

### Target users
- Hackathon teams building payments demos.
- Small groups splitting trip/team expenses.
- Stellar developers learning Soroban + Freighter integration.

---

## 2. 🏗️ Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Blockchain:** Stellar Soroban (Testnet)
- **Wallet:** Freighter Wallet extension
- **Contract language:** Rust (Soroban SDK)

---

## 3. 📁 Folder Structure

```text
project-root/
│
├── contract/
│   ├── src/
│   │   └── lib.rs
│   └── Cargo.toml
│
├── src/
│   ├── components/
│   │   ├── AddExpense.jsx
│   │   ├── BalanceList.jsx
│   │   └── SettleBalance.jsx
│   ├── pages/
│   │   └── HomePage.jsx
│   ├── utils/
│   │   ├── soroban.js
│   │   └── wallet.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── implementation.md
└── package.json
```

---

## 4. 🔗 Smart Contract (Soroban)

The full contract lives in `contract/src/lib.rs` and includes:
- `add_expense(payer, amount, participants)`
- `get_expenses()`
- `get_balances()`
- `settle_balance(from, to, amount)`
- storage via `DataKey::{Expense, Balance, Users, ...}`

It stores expense history and updates net balances in persistent Soroban storage.

---

## 5. 🎨 Frontend Code

Frontend provides:
- Expense form (`AddExpense`)
- Balance panel (`BalanceList`)
- Settlement form/button (`SettleBalance`)
- Wallet state + status messages in `HomePage`

Tailwind is used for a clean dark UI and compact hackathon workflow.

---

## 6. 🔌 Wallet Integration

`src/utils/wallet.js` uses Freighter popup authentication:

```js
import { requestAccess, getPublicKey } from "@stellar/freighter-api";

export async function connectFreighter() {
  await requestAccess(); // triggers popup
  const publicKey = await getPublicKey();
  return publicKey;
}
```

Also includes auto-reconnect checks (`isAllowed`, `isConnected`).

---

## 7. 📡 Contract Interaction Layer

`src/utils/soroban.js` contains helper functions to:
- Read balances: `getBalances(...)`
- Write expense intent: `addExpense(...)`
- Write settlement intent: `settleBalance(...)`

Current hackathon template uses a local mock store so the UI is runnable instantly without backend.
Swap this layer to Soroban RPC + signed XDR when your contract ID is deployed.

---

## 8. 🛠️ Deployment Guide

### Contract Deployment

```bash
cd contract
soroban contract build
soroban contract deploy \
  --network testnet \
  --source dev \
  --wasm target/wasm32v1-none/release/split_bill_contract.wasm
```

Copy the generated contract ID.

### Frontend

Create `.env` in project root:

```env
VITE_CONTRACT_ID=PASTE_DEPLOYED_CONTRACT_ID_HERE
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```

Run frontend:

```bash
npm install
npm run dev
```

---

## 9. 📄 `implementation.md`

Detailed setup and runbook is provided in `implementation.md` with these exact steps:
1. Install dependencies
2. Setup Soroban CLI
3. Build contract
4. Deploy contract
5. Setup frontend
6. Connect wallet
7. Run project

---

## 10. ⚡ DX Boost

- Beginner-friendly, commented contract and frontend code.
- No backend required.
- Copy-paste commands for testnet flow.
- Clean structure (`components/`, `pages/`, `utils/`) for rapid hacking.
