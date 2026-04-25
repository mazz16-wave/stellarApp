# Stellar Split Bill dApp - Implementation Guide

This project contains:
- `contract/`: Soroban smart contract in Rust
- `frontend/`: React + Tailwind app with Freighter wallet integration

The app lets a payer add expenses for a group, calculates net balances on-chain, and records settlements through wallet-signed transactions.

## Step 1: Install Dependencies

Install:
- Rust stable + `wasm32v1-none` target
- Soroban CLI
- Node.js 18+
- Freighter browser extension

```powershell
rustup target add wasm32v1-none

rustc --version
cargo --version
soroban --version
node --version
npm --version
```

## Step 2: Setup Soroban CLI

Create a key and add testnet alias:

```powershell
soroban keys generate dev --network testnet

soroban network add testnet `
  --rpc-url https://soroban-testnet.stellar.org `
  --network-passphrase "Test SDF Network ; September 2015"
```

Fund the key on testnet before deployment.

## Step 3: Build Contract

```powershell
cd contract
soroban contract build
```

Expected wasm:
- `target/wasm32v1-none/release/split_bill_contract.wasm`

## Step 4: Deploy Contract

```powershell
cd contract

soroban contract deploy `
  --network testnet `
  --source dev `
  --wasm target/wasm32v1-none/release/split_bill_contract.wasm
```

Copy the returned contract ID.

## Step 5: Setup Frontend

```powershell
cd frontend
npm install
Copy-Item .env.example .env
```

Set `frontend/.env`:

```env
VITE_CONTRACT_ID=PASTE_DEPLOYED_CONTRACT_ID_HERE
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```

## Step 6: Connect Wallet

The frontend wallet flow uses:
- `requestAccess()` for popup permissions
- `getAddress()` to read wallet public key
- `signTransaction()` to sign Soroban transactions

Use Freighter on testnet with a funded account.

## Step 7: Run Project

```powershell
cd frontend
npm run dev
```

Open the local URL (usually `http://localhost:5173`), then:
- connect wallet
- add expense (`payer`, `amount`, `participants`)
- check balances
- settle via wallet-signed contract tx

## Contract Methods

- `add_expense(payer, amount, participants)`
- `get_expenses()`
- `get_balances()`
- `settle_balance(from, to, amount)`
- `version()`

## Hackathon Notes

- Amount is integer `i64`.
- `amount` must be divisible by number of participants.
- `settle_balance` records the settlement in contract state.
