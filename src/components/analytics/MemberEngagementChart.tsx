
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MemberEngagementChartProps {
  data: Array<{
    month: string;
    meetings: number;
    votes: number;
    events: number;
  }>;
}

export const MemberEngagementChart = ({ data }: MemberEngagementChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Engagement</CardTitle>
        <CardDescription>Participation in cooperative activities</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="meetings" fill="#8884d8" name="Meetings" />
              <Bar dataKey="votes" fill="#82ca9d" name="Votes" />
              <Bar dataKey="events" fill="#ffc658" name="Events" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
