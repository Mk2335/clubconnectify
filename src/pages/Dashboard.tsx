import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ChartBar,
  Users,
  Calendar,
  ListCheck,
  Notebook,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const financialData = [
  { month: "Jan", income: 4000, expenses: 2400 },
  { month: "Feb", income: 3000, expenses: 1398 },
  { month: "Mar", income: 2000, expenses: 9800 },
  { month: "Apr", income: 2780, expenses: 3908 },
  { month: "May", income: 1890, expenses: 4800 },
  { month: "Jun", income: 2390, expenses: 3800 },
];

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Members
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Tasks
                  </CardTitle>
                  <ListCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    4 due this week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Monthly Income
                  </CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€3,423</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Monthly Expenses
                  </CardTitle>
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€2,108</div>
                  <p className="text-xs text-muted-foreground">
                    -4% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartBar className="h-5 w-5" />
                    Financial Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[200px]" config={{}}>
                    <BarChart data={financialData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <ChartTooltip />
                      <Bar dataKey="income" fill="#22c55e" name="Income" />
                      <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    {[
                      {
                        date: "2024-03-25",
                        title: "General Assembly",
                        type: "Meeting",
                      },
                      {
                        date: "2024-03-28",
                        title: "Project Review",
                        type: "Meeting",
                      },
                      {
                        date: "2024-04-01",
                        title: "New Member Orientation",
                        type: "Event",
                      },
                    ].map((event, i) => (
                      <div
                        key={i}
                        className="mb-4 rounded-lg border p-3 hover:bg-accent"
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{event.title}</p>
                          <span className="text-xs text-muted-foreground">
                            {event.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.date}
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListCheck className="h-5 w-5" />
                    Recent Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] pr-4">
                    {[
                      {
                        title: "Update member directory",
                        status: "In Progress",
                        dueDate: "2024-03-30",
                      },
                      {
                        title: "Prepare financial report",
                        status: "Pending",
                        dueDate: "2024-04-05",
                      },
                      {
                        title: "Review new applications",
                        status: "Completed",
                        dueDate: "2024-03-20",
                      },
                    ].map((task, i) => (
                      <div
                        key={i}
                        className="mb-4 rounded-lg border p-3 hover:bg-accent"
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{task.title}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              task.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : task.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Due: {task.dueDate}
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Notebook className="h-5 w-5" />
                    Quick Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Write your notes here..."
                    className="min-h-[150px]"
                  />
                  <Button className="w-full">Save Note</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
