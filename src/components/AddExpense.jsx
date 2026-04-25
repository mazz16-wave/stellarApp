import { useState } from "react";

export default function AddExpense({ wallet, onSubmit }) {
  const [payer, setPayer] = useState(wallet || "");
  const [amount, setAmount] = useState("");
  const [participants, setParticipants] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const participantList = participants
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);

    await onSubmit({
      payer: payer.trim(),
      amount: Number(amount),
      participants: participantList,
    });

    setAmount("");
    setParticipants("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl bg-slate-900 p-5 shadow">
      <h2 className="text-lg font-semibold">Add Expense</h2>
      <input
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2"
        placeholder="Payer public key"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
      />
      <input
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2"
        placeholder="Amount (i64)"
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <textarea
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2"
        placeholder="Participants (comma-separated Stellar public keys)"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
      />

      <button className="w-full rounded-lg bg-indigo-500 py-2 font-medium hover:bg-indigo-400">
        Add Expense
      </button>
    </form>
  );
}
