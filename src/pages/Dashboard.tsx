
import { useState, useEffect } from "react";
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
import { useDashboardData } from "@/hooks/useDashboardData";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [layout, setLayout] = useState<"default" | "compact" | "expanded">("default");
  const { toast } = useToast();
  
  const { 
    financialData, 
    events, 
    tasks, 
    memberStats, 
    taskStats,
    incomeStats,
    expenseStats,
    fetchDashboardData 
  } = useDashboardData(timeRange);

  // Function to refresh data
  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      await fetchDashboardData();
      toast({
        title: "Dashboard refreshed",
        description: "All dashboard data has been updated.",
      });
    } catch (error) {
      toast({
        title: "Failed to refresh data",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
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
            value={memberStats.total}
            subtitle={memberStats.change}
            icon={Users}
            interactive={true}
            onClick={() => window.location.href = "/members"}
          />
          <StatsCard
            title="Active Tasks"
            value={taskStats.total}
            subtitle={taskStats.change}
            icon={ListCheck}
            interactive={true}
            onClick={() => window.location.href = "/tasks"}
          />
          <StatsCard
            title="Monthly Income"
            value={incomeStats.total}
            subtitle={incomeStats.change}
            icon={ArrowUpRight}
            iconColor="text-green-500"
            interactive={true}
            onClick={() => window.location.href = "/members/finances"}
          />
          <StatsCard
            title="Monthly Expenses"
            value={expenseStats.total}
            subtitle={expenseStats.change}
            icon={ArrowDownRight}
            iconColor="text-red-500"
            interactive={true}
            onClick={() => window.location.href = "/members/finances"}
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
