import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  TrendingUp,
  Users,
  Gift,
  Bell,
  Settings,
  Plus,
  Search,
} from "lucide-react";

const Crowdfunding = () => {
  const featuredCampaigns = [
    {
      title: "DigiGeno Verwaltungsplattform für Genossenschaften",
      progress: 35,
      goal: "€550,000",
      backers: 180,
      daysLeft: 45,
    },
    {
      title: "Genossenschaftsbank",
      progress: 25,
      goal: "€5,000,000",
      backers: 320,
      daysLeft: 60,
    },
  ];

  const backedCampaigns = [
    {
      title: "Local Food Co-op",
      pledged: "€500",
      status: "Active",
      reward: "Founding Member",
    },
    {
      title: "Renewable Energy Co-op",
      pledged: "€1,000",
      status: "Completed",
      reward: "Premium Member",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Crowdfunding Platform</h1>

            <Tabs defaultValue="landing" className="space-y-4">
              <TabsList>
                <TabsTrigger value="landing">Featured</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="create">Create</TabsTrigger>
                <TabsTrigger value="backer">Backer</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="landing">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Featured Campaigns</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        {featuredCampaigns.map((campaign, index) => (
                          <div key={index} className="space-y-4">
                            <h3 className="text-lg font-semibold">{campaign.title}</h3>
                            <Progress value={campaign.progress} />
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>{campaign.progress}% of {campaign.goal}</span>
                              <span>{campaign.backers} backers</span>
                              <span>{campaign.daysLeft} days left</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-24">
                          Sustainable Energy
                        </Button>
                        <Button variant="outline" className="h-24">
                          Community Projects
                        </Button>
                        <Button variant="outline" className="h-24">
                          Local Business
                        </Button>
                        <Button variant="outline" className="h-24">
                          Social Impact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="campaigns">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Active Campaigns</CardTitle>
                      <div className="flex gap-4">
                        <Input
                          placeholder="Search campaigns..."
                          className="w-64"
                          type="search"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead>Goal</TableHead>
                          <TableHead>Backers</TableHead>
                          <TableHead>Days Left</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {featuredCampaigns.map((campaign, index) => (
                          <TableRow key={index}>
                            <TableCell>{campaign.title}</TableCell>
                            <TableCell>
                              <Progress value={campaign.progress} className="w-24" />
                            </TableCell>
                            <TableCell>{campaign.goal}</TableCell>
                            <TableCell>{campaign.backers}</TableCell>
                            <TableCell>{campaign.daysLeft}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="create">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Campaign</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Campaign Title</label>
                        <Input placeholder="Enter campaign title" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Funding Goal</label>
                        <Input type="number" placeholder="Enter amount" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Campaign Duration</label>
                        <Input type="number" placeholder="Number of days" />
                      </div>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Campaign
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="backer">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Backed Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Pledged Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Reward Tier</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {backedCampaigns.map((campaign, index) => (
                          <TableRow key={index}>
                            <TableCell>{campaign.title}</TableCell>
                            <TableCell>{campaign.pledged}</TableCell>
                            <TableCell>{campaign.status}</TableCell>
                            <TableCell>{campaign.reward}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="admin">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4">
                          <Users className="w-8 h-8 text-blue-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Total Users</p>
                            <p className="text-2xl font-bold">1,234</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <TrendingUp className="w-8 h-8 text-green-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Total Raised</p>
                            <p className="text-2xl font-bold">€123,456</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <BarChart className="w-8 h-8 text-purple-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Active Campaigns</p>
                            <p className="text-2xl font-bold">45</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Action</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Campaign</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>New Pledge</TableCell>
                            <TableCell>John Doe</TableCell>
                            <TableCell>Sustainable Energy Project</TableCell>
                            <TableCell>€500</TableCell>
                            <TableCell>2024-03-20</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Campaign Created</TableCell>
                            <TableCell>Jane Smith</TableCell>
                            <TableCell>Community Garden Initiative</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>2024-03-19</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Crowdfunding;