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
    <form onSubmit={submit} className="cyber-card cyber-card--terminal card-hover space-y" aria-labelledby="settle-balance-title">
      <div className="section-head">
        <span className="section-eyebrow">OP-02 // settlement relay</span>
        <h2 id="settle-balance-title">Settle Balance</h2>
      </div>

      <label className="field" htmlFor="settle-from">
        <span className="field-label">From debtor</span>
        <span className="input-shell">
          <input
            id="settle-from"
            className="input"
            placeholder="G..."
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </span>
      </label>

      <label className="field" htmlFor="settle-to">
        <span className="field-label">To creditor</span>
        <span className="input-shell">
          <input
            id="settle-to"
            className="input"
            placeholder="G..."
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </span>
      </label>

      <label className="field" htmlFor="settle-amount">
        <span className="field-label">Amount</span>
        <span className="input-shell">
          <input
            id="settle-amount"
            className="input"
            placeholder="60"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </span>
      </label>

      <button className="btn btn-secondary btn-block">Settle via Wallet</button>
    </form>
  );
}
