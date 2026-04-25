export default function BalanceList({ balances }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5 shadow">
      <h2 className="mb-3 text-lg font-semibold">Balances</h2>
      {balances.length === 0 ? (
        <p className="text-sm text-slate-400">No balances yet.</p>
      ) : (
        <ul className="space-y-2">
          {balances.map((b) => (
            <li
              key={b.user}
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
            >
              <span className="truncate pr-3 text-xs sm:text-sm">{b.user}</span>
              <span
                className={`rounded px-2 py-1 text-xs font-semibold ${
                  b.amount >= 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                }`}
              >
                {b.amount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
