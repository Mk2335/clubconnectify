
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MemberStatusChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
}

export const MemberStatusChart = ({ data, colors }: MemberStatusChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Status</CardTitle>
        <CardDescription>Active vs inactive membership status</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie 
                data={data} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
