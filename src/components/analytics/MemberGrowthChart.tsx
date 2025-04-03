
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MemberGrowthChartProps {
  data: Array<{
    month: string;
    members: number;
  }>;
}

export const MemberGrowthChart = ({ data }: MemberGrowthChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Growth</CardTitle>
        <CardDescription>Total member count over the past year</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="members" 
                stroke="#8884d8" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
