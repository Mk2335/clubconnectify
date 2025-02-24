
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface FinancialChartProps {
  data: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  incomeLabel?: string;
  expensesLabel?: string;
}

const FinancialChart = ({ data, incomeLabel = "Income", expensesLabel = "Expenses" }: FinancialChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `€${value}`}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="income"
              name={incomeLabel}
              fill="#4ade80"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              name={expensesLabel}
              fill="#f43f5e"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FinancialChart;
