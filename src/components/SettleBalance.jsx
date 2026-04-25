import { useEffect, useState } from "react";

export default function SettleBalance({ wallet, onSettle }) {
  const [from, setFrom] = useState(wallet || "");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (wallet) setFrom(wallet);
  }, [wallet]);

  const submit = async (e) => {
    e.preventDefault();
    await onSettle({ from: from.trim(), to: to.trim(), amount: Number(amount) });
    setAmount("");
  };

  return (
    <form onSubmit={submit} className="glass-card card-hover space-y">
      <h2>Settle Balance</h2>
      <input
        className="input"
        placeholder="From (debtor)"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        className="input"
        placeholder="To (creditor)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        className="input"
        placeholder="Amount"
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="btn btn-success btn-block">Settle via Wallet</button>
    </form>
  );
}
