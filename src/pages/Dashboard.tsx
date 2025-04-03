
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import FinancialChart from "@/components/dashboard/FinancialChart";
import EventsList from "@/components/dashboard/EventsList";
import TasksList from "@/components/dashboard/TasksList";
import QuickNotes from "@/components/dashboard/QuickNotes";
import TaskManager from "@/components/dashboard/TaskManager";
import {
  Users,
  ListCheck,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const financialData = [
  { month: "Jan", income: 4000, expenses: 2400 },
  { month: "Feb", income: 3000, expenses: 1398 },
  { month: "Mar", income: 2000, expenses: 9800 },
  { month: "Apr", income: 2780, expenses: 3908 },
  { month: "May", income: 1890, expenses: 4800 },
  { month: "Jun", income: 2390, expenses: 3800 },
];

const events = [
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
];

const tasks = [
  {
    title: "Update member directory",
    status: "In Progress" as const,
    dueDate: "2024-03-30",
  },
  {
    title: "Prepare financial report",
    status: "Pending" as const,
    dueDate: "2024-04-05",
  },
  {
    title: "Review new applications",
    status: "Completed" as const,
    dueDate: "2024-03-20",
  },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [layout, setLayout] = useState<"default" | "compact" | "expanded">("default");

  // Function to simulate data refresh
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <AppLayout title="Dashboard">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          <Select value={layout} onValueChange={(value) => setLayout(value as any)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default View</SelectItem>
              <SelectItem value="compact">Compact View</SelectItem>
              <SelectItem value="expanded">Expanded View</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={refreshData} 
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Members"
            value={45}
            subtitle="+2 from last month"
            icon={Users}
            interactive={true}
          />
          <StatsCard
            title="Active Tasks"
            value={12}
            subtitle="4 due this week"
            icon={ListCheck}
            interactive={true}
          />
          <StatsCard
            title="Monthly Income"
            value="€3,423"
            subtitle="+12.5% from last month"
            icon={ArrowUpRight}
            iconColor="text-green-500"
            interactive={true}
          />
          <StatsCard
            title="Monthly Expenses"
            value="€2,108"
            subtitle="-4% from last month"
            icon={ArrowDownRight}
            iconColor="text-red-500"
            interactive={true}
          />
        </div>

        <div className={`grid gap-6 ${layout === "expanded" ? "md:grid-cols-1" : layout === "compact" ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          <div className={layout === "expanded" ? "md:col-span-1" : layout === "compact" ? "md:col-span-2" : ""}>
            <FinancialChart 
              data={financialData} 
              isLoading={isRefreshing} 
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
            />
          </div>
          <div>
            <EventsList events={events} isLoading={isRefreshing} />
          </div>
        </div>

        <div className={`grid gap-6 ${layout === "default" || layout === "expanded" ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
          <TaskManager />
          <QuickNotes />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
