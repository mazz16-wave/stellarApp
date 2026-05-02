export default function BalanceList({ balances }) {
  return (
    <div className="cyber-card cyber-card--holographic balance-panel">
      <div className="section-head">
        <span className="section-eyebrow">Ledger feed // balances</span>
        <h2>Balances</h2>
      </div>
      {balances.length === 0 ? (
        <p className="muted-text">
          <span className="terminal-prefix">&gt;</span> No balances yet. Add an expense to wake the feed.
        </p>
      ) : (
        <ul className="balance-list">
          {balances.map((b) => (
            <li key={b.user} className="balance-item">
              <span className="balance-user" title={b.user}>
                {b.user}
              </span>
              <span className={`badge ${b.amount >= 0 ? "badge-positive" : "badge-negative"}`}>
                {b.amount >= 0 ? "+" : ""}
                {b.amount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
