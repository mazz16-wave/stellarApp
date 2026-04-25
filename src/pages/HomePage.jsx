import AddExpense from "../components/AddExpense";
import BalanceList from "../components/BalanceList";
import SettleBalance from "../components/SettleBalance";

export default function HomePage({ wallet, balances, cfg, status, onConnect, onAddExpense, onSettle }) {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      <header className="mb-6 rounded-2xl bg-slate-900 p-5 shadow">
        <h1 className="text-2xl font-bold">Split Bill dApp (Stellar Soroban)</h1>
        <p className="mt-2 text-sm text-slate-300">
          Add shared expenses, view net balances, and settle balances with Freighter wallet.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <button className="rounded-lg bg-indigo-500 px-4 py-2 font-semibold hover:bg-indigo-400" onClick={onConnect}>
            Connect Freighter
          </button>
          <span className="rounded-md bg-slate-800 px-2 py-1 text-xs">
            Wallet: {wallet || "Not connected"}
          </span>
          <span className="rounded-md bg-slate-800 px-2 py-1 text-xs">Contract: {cfg.CONTRACT_ID}</span>
        </div>
        <p className="mt-3 text-xs text-amber-300">{status}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <AddExpense wallet={wallet} onSubmit={onAddExpense} />
        <SettleBalance wallet={wallet} onSettle={onSettle} />
      </section>

      <section className="mt-4">
        <BalanceList balances={balances} />
      </section>
    </main>
  );
}
