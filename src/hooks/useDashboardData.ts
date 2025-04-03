
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface FinancialData {
  month: string;
  income: number;
  expenses: number;
}

interface Event {
  date: string;
  title: string;
  type: string;
  description?: string;
}

interface Task {
  title: string;
  status: "Completed" | "In Progress" | "Pending";
  dueDate: string;
}

interface StatsData {
  total: string | number;
  change: string;
}

export const useDashboardData = (timeRange: string = "6m") => {
  // State for different data sections
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // State for dashboard cards
  const [memberStats, setMemberStats] = useState<StatsData>({
    total: 0,
    change: "+0 from last month"
  });
  
  const [taskStats, setTaskStats] = useState<StatsData>({
    total: 0,
    change: "0 due this week"
  });
  
  const [incomeStats, setIncomeStats] = useState<StatsData>({
    total: "€0",
    change: "+0% from last month"
  });
  
  const [expenseStats, setExpenseStats] = useState<StatsData>({
    total: "€0",
    change: "+0% from last month"
  });

  // Function to fetch data from Supabase and/or local storage
  const fetchDashboardData = async () => {
    try {
      // Determine date range based on timeRange
      const today = new Date();
      const startDate = new Date();
      
      switch (timeRange) {
        case "1m":
          startDate.setMonth(today.getMonth() - 1);
          break;
        case "3m":
          startDate.setMonth(today.getMonth() - 3);
          break;
        case "6m":
          startDate.setMonth(today.getMonth() - 6);
          break;
        case "1y":
          startDate.setFullYear(today.getFullYear() - 1);
          break;
        default:
          startDate.setMonth(today.getMonth() - 6);
      }
      
      // Fetch financial data
      await fetchFinancialData(startDate, today);
      
      // Fetch events
      await fetchEvents();
      
      // Fetch tasks
      fetchTasks();
      
      // Fetch member statistics
      await fetchMemberStats();
      
      return true;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return false;
    }
  };

  // Helper functions for fetching different data types
  const fetchFinancialData = async (startDate: Date, endDate: Date) => {
    // In a real app, fetch from Supabase
    // For now, generate sample data
    const months = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      months.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    const data = months.map(date => {
      const month = date.toLocaleString('default', { month: 'short' });
      // Generate some random data
      const income = Math.floor(Math.random() * 5000) + 2000;
      const expenses = Math.floor(Math.random() * 3000) + 1000;
      
      return { month, income, expenses };
    });
    
    setFinancialData(data);
    
    // Set income and expense stats based on latest month
    if (data.length > 0) {
      const latestMonth = data[data.length - 1];
      const previousMonth = data.length > 1 ? data[data.length - 2] : null;
      
      let incomeChange = "0%";
      let expenseChange = "0%";
      
      if (previousMonth) {
        const incomeChangePercent = ((latestMonth.income - previousMonth.income) / previousMonth.income * 100).toFixed(1);
        const expenseChangePercent = ((latestMonth.expenses - previousMonth.expenses) / previousMonth.expenses * 100).toFixed(1);
        
        incomeChange = `${Number(incomeChangePercent) >= 0 ? '+' : ''}${incomeChangePercent}% from last month`;
        expenseChange = `${Number(expenseChangePercent) >= 0 ? '+' : ''}${expenseChangePercent}% from last month`;
      }
      
      setIncomeStats({
        total: `€${latestMonth.income.toLocaleString()}`,
        change: incomeChange
      });
      
      setExpenseStats({
        total: `€${latestMonth.expenses.toLocaleString()}`,
        change: expenseChange
      });
    }
  };

  const fetchEvents = async () => {
    // Try to fetch from Supabase
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .limit(10);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setEvents(data);
      } else {
        // Fallback to sample data
        setEvents([
          {
            date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            title: "General Assembly",
            type: "Meeting",
            description: "Regular scheduled meeting for all team members."
          },
          {
            date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            title: "Project Review",
            type: "Meeting",
            description: "Review of current projects and their status."
          },
          {
            date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            title: "New Member Orientation",
            type: "Event",
            description: "Special event for the organization."
          }
        ]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      // Fallback to sample data
      setEvents([
        {
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          title: "General Assembly",
          type: "Meeting",
          description: "Regular scheduled meeting for all team members."
        },
        {
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          title: "Project Review",
          type: "Meeting",
          description: "Review of current projects and their status."
        },
        {
          date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          title: "New Member Orientation",
          type: "Event",
          description: "Special event for the organization."
        }
      ]);
    }
  };

  const fetchTasks = () => {
    // Get tasks from local storage if available
    const savedTasks = localStorage.getItem("dashboardTasks");
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
    
    setTasks(parsedTasks);
    
    // Count active tasks and tasks due this week
    const activeTasks = parsedTasks.filter(
      (task: any) => task.status !== "Completed"
    ).length;
    
    const today = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(today.getDate() + 7);
    
    const tasksDueThisWeek = parsedTasks.filter((task: any) => {
      const dueDate = new Date(task.dueDate);
      return task.status !== "Completed" && 
             dueDate >= today && 
             dueDate <= weekFromNow;
    }).length;
    
    setTaskStats({
      total: activeTasks,
      change: `${tasksDueThisWeek} due this week`
    });
  };

  const fetchMemberStats = async () => {
    try {
      // Try to fetch from Supabase
      const { data: currentMembers, error: currentError } = await supabase
        .from('members')
        .select('id')
        .eq('status', 'Active');
      
      if (currentError) throw currentError;
      
      // Get member count from previous month for comparison
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      
      const { data: previousMembers, error: prevError } = await supabase
        .from('members')
        .select('id')
        .eq('status', 'Active')
        .lt('join_date', lastMonth.toISOString().split('T')[0]);
      
      if (prevError) throw prevError;
      
      const currentCount = currentMembers?.length || 0;
      const prevCount = previousMembers?.length || 0;
      const difference = currentCount - prevCount;
      
      setMemberStats({
        total: currentCount,
        change: `${difference >= 0 ? '+' : ''}${difference} from last month`
      });
    } catch (error) {
      console.error("Error fetching member stats:", error);
      // Fallback values
      setMemberStats({
        total: 45,
        change: "+2 from last month"
      });
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  return {
    financialData,
    events,
    tasks,
    memberStats,
    taskStats,
    incomeStats,
    expenseStats,
    fetchDashboardData
  };
};
