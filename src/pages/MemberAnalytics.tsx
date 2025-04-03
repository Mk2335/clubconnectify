import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip as RechartsTooltip, Legend, Cell, Line, Pie } from "recharts";

// Sample data for analytics
const memberGrowthData = [
  { month: "Jan", members: 45 },
  { month: "Feb", members: 52 },
  { month: "Mar", members: 61 },
  { month: "Apr", members: 67 },
  { month: "May", members: 75 },
  { month: "Jun", members: 84 },
  { month: "Jul", members: 87 },
  { month: "Aug", members: 92 },
  { month: "Sep", members: 98 },
  { month: "Oct", members: 105 },
  { month: "Nov", members: 110 },
  { month: "Dec", members: 120 }
];

const memberTypeData = [
  { name: "Individual", value: 82 },
  { name: "Company", value: 38 }
];

const memberStatusData = [
  { name: "Active", value: 95 },
  { name: "Inactive", value: 15 },
  { name: "Pending", value: 10 }
];

const memberEngagementData = [
  { month: "Jan", meetings: 35, votes: 28, events: 15 },
  { month: "Feb", meetings: 28, votes: 32, events: 18 },
  { month: "Mar", meetings: 32, votes: 36, events: 22 },
  { month: "Apr", meetings: 40, votes: 40, events: 25 },
  { month: "May", meetings: 38, votes: 45, events: 30 },
  { month: "Jun", meetings: 42, votes: 50, events: 35 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MemberAnalytics = () => {
  return (
    <AppLayout title="Member Analytics">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Growth</CardTitle>
                <CardDescription>Total member count over the past year</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={memberGrowthData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
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
            
            <Card>
              <CardHeader>
                <CardTitle>Member Types</CardTitle>
                <CardDescription>Distribution of individual vs company members</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <RechartsTooltip />
                      <Legend />
                      <Pie 
                        data={memberTypeData} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80} 
                        label
                      >
                        {memberTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Member Status</CardTitle>
                <CardDescription>Active vs inactive membership status</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <RechartsTooltip />
                      <Legend />
                      <Pie 
                        data={memberStatusData} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80} 
                        label
                      >
                        {memberStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Member Engagement</CardTitle>
                <CardDescription>Participation in cooperative activities</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={memberEngagementData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="meetings" fill="#8884d8" name="Meetings" />
                      <Bar dataKey="votes" fill="#82ca9d" name="Votes" />
                      <Bar dataKey="events" fill="#ffc658" name="Events" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Engagement Metrics</CardTitle>
              <CardDescription>Expanded analysis of member participation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This section will provide detailed analytics on member engagement across various cooperative activities.
                Member participation trends, activity patterns, and contribution metrics will be displayed here.
              </p>
              <div className="text-center text-muted-foreground">Coming soon</div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>Member Demographics</CardTitle>
              <CardDescription>Analysis of member population characteristics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This section will provide demographic breakdowns of the cooperative membership.
                Age distributions, geographical representation, and other demographic metrics will be displayed here.
              </p>
              <div className="text-center text-muted-foreground">Coming soon</div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>Generate customized member analytics reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This section will allow administrators to generate custom reports based on specific metrics and time periods.
                Export options for various formats will be available.
              </p>
              <div className="text-center text-muted-foreground">Coming soon</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default MemberAnalytics;
