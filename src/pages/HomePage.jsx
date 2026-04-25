import AddExpense from "../components/AddExpense";
import BalanceList from "../components/BalanceList";
import SettleBalance from "../components/SettleBalance";

export default function HomePage({ wallet, balances, cfg, status, onConnect, onAddExpense, onSettle }) {
  return (
    <main className="page-shell">
      <div className="bg-orb bg-orb--one" />
      <div className="bg-orb bg-orb--two" />

      <header className="hero-card">
        <h1>Split Bill dApp ✨</h1>
        <p className="hero-subtitle">
          Track shared expenses, settle balances, and connect Freighter in one place.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onConnect}>
            {wallet ? "Reconnect Freighter" : "Connect Freighter"}
          </button>
          <span className="pill">
            <strong>Wallet:</strong> {wallet || "Not connected"}
          </span>
          <span className="pill">
            <strong>Contract:</strong> {cfg.CONTRACT_ID}
          </span>
        </div>

        <p className="status-text">{status}</p>
      </header>

      <section className="form-grid">
        <AddExpense wallet={wallet} onSubmit={onAddExpense} />
        <SettleBalance wallet={wallet} onSettle={onSettle} />
      </section>

      <section>
        <BalanceList balances={balances} />
      </section>
    </main>
  );
}
