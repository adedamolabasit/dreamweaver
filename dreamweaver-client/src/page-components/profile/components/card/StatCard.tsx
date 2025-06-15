import { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
  color: "emerald" | "sky" | "indigo" | "green" | "yellow";
};

export const StatCard = ({ icon, label, value, color }: StatCardProps) => {
  const colorClasses = {
    emerald: "bg-emerald-500/20 text-emerald-400",
    sky: "bg-sky-500/20 text-sky-400",
    indigo: "bg-indigo-500/20 text-indigo-400",
    green: "bg-green-500/20 text-green-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <div className="rounded-xl p-5 bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        <div>
          <h3 className="text-sm font-medium text-gray-300">{label}</h3>
          <div className="text-2xl font-bold text-white mt-1">{value}</div>
        </div>
      </div>
    </div>
  );
};
