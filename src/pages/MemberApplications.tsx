
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowRight, Check, X, Clock, FileText, UserCheck, UserPlus } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useState } from "react";

// Sample application data
const applications = [
  {
    id: "APP001",
    name: "John Smith",
    email: "john@example.com",
    status: "pending",
    type: "Individual",
    date: "2025-03-28",
    shares: 2
  },
  {
    id: "APP002",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    status: "approved",
    type: "Individual",
    date: "2025-03-25",
    shares: 1
  },
  {
    id: "APP003",
    name: "Green Future Co-op",
    email: "info@greenfuture.org",
    status: "rejected",
    type: "Company",
    date: "2025-03-22",
    shares: 5
  },
  {
    id: "APP004",
    name: "Michael Wong",
    email: "michael@example.com",
    status: "pending",
    type: "Individual",
    date: "2025-03-20",
    shares: 3
  }
];

const MemberApplications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  // Filter applications based on search term and filter value
  const filteredApplications = applications.filter(app => {
    // Filter by status
    if (filterValue !== "all" && app.status !== filterValue) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !app.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !app.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !app.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <Check className="h-4 w-4 text-green-500" />;
      case "rejected": return <X className="h-4 w-4 text-red-500" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <AppLayout title="Member Applications">
      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="applications">
            <FileText className="mr-2 h-4 w-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="new">
            <UserPlus className="mr-2 h-4 w-4" />
            New Application
          </TabsTrigger>
          <TabsTrigger value="process">
            <ArrowRight className="mr-2 h-4 w-4" />
            Application Process
          </TabsTrigger>
          <TabsTrigger value="review">
            <UserCheck className="mr-2 h-4 w-4" />
            Review Committee
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications">
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="Search applications..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select 
                className="h-10 border border-input rounded-md px-3 py-2 text-sm"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>
                        {application.name}
                        <div className="text-xs text-muted-foreground">{application.email}</div>
                      </TableCell>
                      <TableCell>{application.type}</TableCell>
                      <TableCell>{application.shares}</TableCell>
                      <TableCell>{new Date(application.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getStatusIcon(application.status)}
                          <span className="ml-1 capitalize">{application.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>New Member Application</CardTitle>
              <CardDescription>
                Create a new application for cooperative membership
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sample form fields that would be part of the application */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Enter last name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input placeholder="Enter email address" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="Enter phone number" />
                  </div>
                </div>
                
                <div className="pt-4">
                  <p className="text-muted-foreground mb-2">
                    This form will collect all necessary information for a new membership application.
                  </p>
                  <Button>Continue to Next Step</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="process">
          <Card>
            <CardHeader>
              <CardTitle>Application Process Workflow</CardTitle>
              <CardDescription>
                Overview of the member application approval process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 py-4">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="rounded-full bg-primary/20 text-primary p-3">
                      <UserPlus className="h-6 w-6" />
                    </div>
                    <div className="h-full border-l border-dashed border-primary/20 my-2"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Application Submission</h3>
                    <p className="text-muted-foreground">
                      Prospective member completes the application form with personal information,
                      share selection, and agreement to cooperative terms.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="rounded-full bg-primary/20 text-primary p-3">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="h-full border-l border-dashed border-primary/20 my-2"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Documentation Review</h3>
                    <p className="text-muted-foreground">
                      Membership committee reviews the application and supporting documents
                      for completeness and accuracy.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="rounded-full bg-primary/20 text-primary p-3">
                      <UserCheck className="h-6 w-6" />
                    </div>
                    <div className="h-full border-l border-dashed border-primary/20 my-2"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Committee Approval</h3>
                    <p className="text-muted-foreground">
                      Membership committee votes to approve or reject the application
                      based on cooperative guidelines.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="rounded-full bg-primary/20 text-primary p-3">
                      <Check className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Finalization</h3>
                    <p className="text-muted-foreground">
                      Approved applications are processed, share certificates issued,
                      and new members added to the cooperative registry.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle>Application Review Committee</CardTitle>
              <CardDescription>
                Manage the committee responsible for reviewing member applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                This section allows you to manage the committee members who review and approve membership applications.
                Committee configuration and approval workflows can be customized here.
              </p>
              <div className="text-center my-12">
                <p className="text-muted-foreground mb-4">Review committee features coming soon</p>
                <Button variant="outline">Configure Committee</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default MemberApplications;
