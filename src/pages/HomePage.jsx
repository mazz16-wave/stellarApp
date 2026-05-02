import AddExpense from "../components/AddExpense";
import BalanceList from "../components/BalanceList";
import SettleBalance from "../components/SettleBalance";

export default function HomePage({ wallet, balances, cfg, status, onConnect, onAddExpense, onSettle }) {
  const shorten = (value) => {
    if (!value) return "UNLINKED";
    if (value.length <= 16) return value;
    return `${value.slice(0, 6)}...${value.slice(-6)}`;
  };

  const contractId = cfg.CONTRACT_ID || "UNBOUND";
  const balanceCount = balances.length;
  const exposure = balances.reduce((sum, item) => sum + Math.abs(Number(item.amount) || 0), 0);

  return (
    <main className="page-shell">
      <header className="hero-panel">
        <div className="hero-copy">
          <span className="cyber-kicker">Stellar split protocol // local mock</span>
          <h1 className="cyber-glitch" data-text="Split Bill">
            Split Bill
          </h1>
          <p className="hero-subtitle">
            <span className="terminal-prefix">&gt;</span> Track shared debt, route settlements through Freighter, and keep every balance glowing in the ledger feed.
            <span className="cursor" aria-hidden="true" />
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onConnect} type="button">
              {wallet ? "Reconnect Freighter" : "Connect Freighter"}
            </button>
          </div>

          <div className="system-cluster" aria-label="System identifiers">
            <span className="system-chip">
              <span className="chip-label">Wallet</span>
              <span className="chip-value" title={wallet || "Not connected"}>
                {shorten(wallet)}
              </span>
            </span>
            <span className="system-chip">
              <span className="chip-label">Contract</span>
              <span className="chip-value" title={contractId}>
                {shorten(contractId)}
              </span>
            </span>
          </div>

          <p className="status-text" aria-live="polite">
            <span className="terminal-prefix">&gt;</span> {status}
          </p>
        </div>

        <aside className="hud-panel" aria-label="Ledger telemetry">
          <div className="hud-title">Operator HUD</div>
          <div className="hud-grid">
            <div className="hud-tile">
              <span className="hud-label">Wallet Link</span>
              <span className="hud-value hud-value--accent">{wallet ? "Live" : "Idle"}</span>
            </div>
            <div className="hud-tile">
              <span className="hud-label">Accounts Tracked</span>
              <span className="hud-value">{balanceCount}</span>
            </div>
            <div className="hud-tile">
              <span className="hud-label">Total Exposure</span>
              <span className="hud-value hud-value--secondary">{exposure}</span>
            </div>
          </div>
        </aside>
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
