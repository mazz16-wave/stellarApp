import { useState } from "react";

export default function SettleBalance({ wallet, onSettle }) {
  const [from, setFrom] = useState(wallet || "");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await onSettle({ from: from.trim(), to: to.trim(), amount: Number(amount) });
    setAmount("");
  };

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl bg-slate-900 p-5 shadow">
      <h2 className="text-lg font-semibold">Settle Balance</h2>
      <input
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2"
        placeholder="From (debtor)"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2"
        placeholder="To (creditor)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2"
        placeholder="Amount"
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="w-full rounded-lg bg-emerald-600 py-2 font-medium hover:bg-emerald-500">
        Settle via Wallet
      </button>
    </form>
  );
}
