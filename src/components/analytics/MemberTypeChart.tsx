
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MemberTypeChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
}

export const MemberTypeChart = ({ data, colors }: MemberTypeChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Types</CardTitle>
        <CardDescription>Distribution of individual vs company members</CardDescription>
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
