import { Card } from "antd";
import { ReactNode } from "react";

interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function StatisticCard({
  title,
  value,
  icon,
}: StatisticCardProps) {
  return (
    <Card className="text-center">
      <div className="flex items-center justify-center mb-2">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </Card>
  );
}
