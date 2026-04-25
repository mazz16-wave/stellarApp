# implementation.md

## Step 1: Install dependencies

Install required tools:
- Rust (stable)
- Soroban CLI
- Node.js 18+
- Freighter extension in Chrome

```bash
rustup update
rustup target add wasm32v1-none
cargo install --locked stellar-cli
node --version
npm --version
soroban --version
```

## Step 2: Setup Soroban CLI

```bash
soroban network add testnet \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"

soroban keys generate dev --network testnet
soroban keys fund dev --network testnet
```

## Step 3: Build contract

```bash
cd contract
soroban contract build
```

## Step 4: Deploy contract

```bash
cd contract
soroban contract deploy \
  --network testnet \
  --source dev \
  --wasm target/wasm32v1-none/release/split_bill_contract.wasm
```

Copy the returned contract ID.

## Step 5: Setup frontend

From project root, create `.env`:

```env
VITE_CONTRACT_ID=PASTE_DEPLOYED_CONTRACT_ID_HERE
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```

Install frontend dependencies:

```bash
npm install
```

## Step 6: Connect wallet

1. Install Freighter Chrome extension.
2. Set network to Testnet.
3. In the app, click **Connect Freighter**.
4. Approve popup (triggered by `requestAccess()`).
5. App reads public key via `getPublicKey()`.

## Step 7: Run project

```bash
npm run dev
```

Open local Vite URL (usually `http://localhost:5173`) and:
- Add expense (payer, amount, participants)
- Review balances
- Settle with wallet signature using **Settle via Wallet**
