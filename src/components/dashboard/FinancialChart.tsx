
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FinancialChartProps {
  data: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  incomeLabel?: string;
  expensesLabel?: string;
  isLoading?: boolean;
  timeRange?: string;
  onTimeRangeChange?: (value: string) => void;
}

const FinancialChart = ({ 
  data, 
  incomeLabel = "Income", 
  expensesLabel = "Expenses",
  isLoading = false,
  timeRange = "6m",
  onTimeRangeChange
}: FinancialChartProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle>Financial Overview</CardTitle>
        <div className="flex items-center space-x-2">
          <Select 
            value={timeRange} 
            onValueChange={(value) => onTimeRangeChange && onTimeRangeChange(value)}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last month</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[350px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
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
              <Tooltip 
                cursor={{ opacity: 0.2 }}
                contentStyle={{ 
                  borderRadius: '6px', 
                  border: '1px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
              />
              <Bar
                dataKey="income"
                name={incomeLabel}
                fill="#4ade80"
                radius={[4, 4, 0, 0]}
                animationDuration={500}
              />
              <Bar
                dataKey="expenses"
                name={expensesLabel}
                fill="#f43f5e"
                radius={[4, 4, 0, 0]}
                animationDuration={500}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialChart;
