export default function BalanceList({ balances }) {
  return (
    <div className="glass-card">
      <h2>Balances</h2>
      {balances.length === 0 ? (
        <p className="muted-text">No balances yet.</p>
      ) : (
        <ul className="balance-list">
          {balances.map((b) => (
            <li key={b.user} className="balance-item">
              <span className="balance-user">{b.user}</span>
              <span className={`badge ${b.amount >= 0 ? "badge-positive" : "badge-negative"}`}>{b.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
