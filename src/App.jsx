import { useEffect, useMemo, useState } from "react";
import HomePage from "./pages/HomePage";
import { connectFreighter, getConnectedWallet } from "./utils/wallet";
import { addExpense, getBalances, getContractConfig, settleBalance } from "./utils/soroban";

function App() {
  const [wallet, setWallet] = useState("");
  const [balances, setBalances] = useState([]);
  const [status, setStatus] = useState("Connect Freighter to begin.");
  const cfg = useMemo(() => getContractConfig(), []);

  const refreshBalances = async (pubKey = wallet) => {
    if (!pubKey) return;

    try {
      const data = await getBalances(pubKey);
      setBalances(data);
    } catch (e) {
      setStatus(`Could not load balances: ${e.message}`);
    }
  };

  useEffect(() => {
    getConnectedWallet().then((w) => {
      if (w) {
        setWallet(w);
        setStatus("Freighter already connected.");
        refreshBalances(w);
      }
    });
  }, []);

  const onConnect = async () => {
    try {
      const pub = await connectFreighter();
      setWallet(pub);
      setStatus("Wallet connected successfully.");
      await refreshBalances(pub);
    } catch (e) {
      setStatus(`Wallet connection failed: ${e.message}`);
    }
  };

  const onAddExpense = async ({ payer, amount, participants }) => {
    try {
      setStatus("Submitting add_expense transaction...");
      await addExpense(wallet, payer, amount, participants);
      setStatus("Expense added. Waiting for network finalization.");
      await refreshBalances(wallet);
    } catch (e) {
      setStatus(`Add expense failed: ${e.message}`);
    }
  };

  const onSettle = async ({ from, to, amount }) => {
    try {
      setStatus("Submitting settle_balance transaction...");
      await settleBalance(wallet, from, to, amount);
      setStatus("Settlement submitted.");
      await refreshBalances(wallet);
    } catch (e) {
      setStatus(`Settlement failed: ${e.message}`);
    }
  };

  return (
    <HomePage
      wallet={wallet}
      balances={balances}
      cfg={cfg}
      status={status}
      onConnect={onConnect}
      onAddExpense={onAddExpense}
      onSettle={onSettle}
    />
  );
}

export default App;
