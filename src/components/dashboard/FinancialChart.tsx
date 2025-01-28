import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { ChartBar } from "lucide-react";

interface FinancialData {
  month: string;
  income: number;
  expenses: number;
}

interface FinancialChartProps {
  data: FinancialData[];
}

const FinancialChart = ({ data }: FinancialChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartBar className="h-5 w-5" />
          Financial Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[200px]" config={{}}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip />
            <Bar dataKey="income" fill="#22c55e" name="Income" />
            <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FinancialChart;