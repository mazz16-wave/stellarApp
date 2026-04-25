import { useEffect, useState } from "react";

export default function AddExpense({ wallet, onSubmit }) {
  const [payer, setPayer] = useState(wallet || "");
  const [amount, setAmount] = useState("");
  const [participants, setParticipants] = useState("");

  useEffect(() => {
    if (wallet) setPayer(wallet);
  }, [wallet]);

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
    <form onSubmit={handleSubmit} className="glass-card card-hover space-y">
      <h2>Add Expense</h2>
      <input
        className="input"
        placeholder="Payer public key"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
      />
      <input
        className="input"
        placeholder="Amount (i64)"
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <textarea
        className="input"
        placeholder="Participants (comma-separated Stellar public keys)"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
      />

      <button className="btn btn-primary btn-block">Add Expense</button>
    </form>
  );
}
