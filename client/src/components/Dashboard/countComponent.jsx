const CountComponent = ({ Icon, count, text, accent = 'indigo' }) => {
  const accentStyles = {
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-emerald-100 text-emerald-600',
    purple: 'bg-violet-100 text-violet-600',
    pink: 'bg-pink-100 text-pink-600',
    amber: 'bg-amber-100 text-amber-600',
    sky: 'bg-sky-100 text-sky-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <div data-testid={`count-card-${text.toLowerCase().replace(/\s+/g, '-')}`} className="flex min-w-55 flex-1 items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentStyles[accent] || accentStyles.indigo}`}>
        <Icon className="text-xl" />
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-slate-500">{text}</p>
        <div className="mt-1 flex items-end justify-between gap-2">
          <h3 data-testid={`count-value-${text.toLowerCase().replace(/\s+/g, '-')}`} className="text-3xl font-bold tracking-tight text-slate-800">{count}</h3>
        </div>
      </div>
    </div>
  );
};

export default CountComponent