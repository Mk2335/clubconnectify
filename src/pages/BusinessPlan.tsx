import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BusinessPlan = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Business plan has been saved successfully.",
    });
  };

  const financialData = [
    { month: 'Jan', revenue: 4000, expenses: 2400 },
    { month: 'Feb', revenue: 3000, expenses: 1398 },
    { month: 'Mar', revenue: 2000, expenses: 9800 },
    { month: 'Apr', revenue: 2780, expenses: 3908 },
    { month: 'May', revenue: 1890, expenses: 4800 },
    { month: 'Jun', revenue: 2390, expenses: 3800 },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold">Business Plan & Economics</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Projections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full overflow-x-auto">
                    <LineChart
                      width={600}
                      height={300}
                      data={financialData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                      <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                    </LineChart>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Model</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="value-proposition">Value Proposition</Label>
                    <Textarea
                      id="value-proposition"
                      placeholder="Describe your cooperative's unique value proposition..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="target-market">Target Market</Label>
                    <Textarea
                      id="target-market"
                      placeholder="Define your target market and customer segments..."
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Planning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="initial-investment">Initial Investment Required</Label>
                      <Input
                        id="initial-investment"
                        type="number"
                        placeholder="Enter amount..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="break-even">Expected Break-even Point</Label>
                      <Input
                        id="break-even"
                        type="number"
                        placeholder="Months to break-even..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="financial-strategy">Financial Strategy</Label>
                    <Textarea
                      id="financial-strategy"
                      placeholder="Describe your financial strategy and funding sources..."
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit">Save Business Plan</Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default BusinessPlan;