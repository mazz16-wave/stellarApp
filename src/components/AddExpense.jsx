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
    <form onSubmit={handleSubmit} className="cyber-card cyber-card--terminal card-hover space-y" aria-labelledby="add-expense-title">
      <div className="section-head">
        <span className="section-eyebrow">OP-01 // expense intake</span>
        <h2 id="add-expense-title">Add Expense</h2>
      </div>

      <label className="field" htmlFor="payer-key">
        <span className="field-label">Payer public key</span>
        <span className="input-shell">
          <input
            id="payer-key"
            className="input"
            placeholder="G..."
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
          />
        </span>
      </label>

      <label className="field" htmlFor="expense-amount">
        <span className="field-label">Amount (i64)</span>
        <span className="input-shell">
          <input
            id="expense-amount"
            className="input"
            placeholder="120"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </span>
      </label>

      <label className="field" htmlFor="expense-participants">
        <span className="field-label">Participants</span>
        <span className="input-shell input-shell--textarea">
          <textarea
            id="expense-participants"
            className="input"
            placeholder="Comma-separated Stellar public keys"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          />
        </span>
      </label>

      <button className="btn btn-primary btn-block">Add Expense</button>
    </form>
  );
}
