
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid3X3, ListFilter, List, MapPin } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Member } from "@/types/member";
import { useState } from "react";

const members: Member[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "Active",
    joinDate: "2023-05-10",
    type: "Individual",
    role: "Board Member"
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    status: "Active",
    joinDate: "2023-06-15",
    type: "Individual",
    role: "Regular Member"
  },
  {
    id: "3",
    name: "Eco Solutions Ltd",
    email: "contact@ecosolutions.com",
    status: "Active",
    joinDate: "2023-07-20",
    type: "Company",
    companyDetails: {
      companyName: "Eco Solutions Ltd",
      registrationNumber: "ECO123456",
      contactPerson: "Carol Davis"
    },
    role: "Corporate Member"
  },
  {
    id: "4",
    name: "Dave Wilson",
    email: "dave@example.com",
    status: "Inactive",
    joinDate: "2023-03-05",
    type: "Individual",
    role: "Regular Member"
  },
  {
    id: "5",
    name: "Community Gardens Inc",
    email: "info@communitygardens.org",
    status: "Active",
    joinDate: "2023-09-12",
    type: "Company",
    companyDetails: {
      companyName: "Community Gardens Inc",
      registrationNumber: "CG789012",
      contactPerson: "Elena Flores"
    },
    role: "Corporate Member"
  }
];

const MemberDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout title="Member Directory">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Members</TabsTrigger>
            <TabsTrigger value="individuals">Individuals</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="board">Board Members</TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            <Button 
              variant={viewMode === "grid" ? "default" : "outline"} 
              size="icon" 
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="icon" 
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              placeholder="Search members..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <ListFilter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <TabsContent value="all">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="h-full transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-lg mb-1">{member.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{member.email}</p>
                        <div className="flex items-center text-xs text-muted-foreground mb-3">
                          <span className={`inline-block w-2 h-2 rounded-full mr-1 ${member.status === "Active" ? "bg-green-500" : "bg-gray-400"}`}></span>
                          {member.status}
                        </div>
                        {member.role && <p className="text-sm">{member.role}</p>}
                        {member.type === "Company" && member.companyDetails && (
                          <p className="text-sm mt-2">
                            Contact: {member.companyDetails.contactPerson}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                      <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
                      <Button variant="ghost" size="sm">View Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      {member.name}
                      <div className="text-xs text-muted-foreground">{member.email}</div>
                    </TableCell>
                    <TableCell>{member.role || 'Member'}</TableCell>
                    <TableCell>{member.type}</TableCell>
                    <TableCell>
                      <span className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1 ${member.status === "Active" ? "bg-green-500" : "bg-gray-400"}`}></span>
                        {member.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
        
        <TabsContent value="individuals">
          <p className="text-muted-foreground">Individual members will be displayed here</p>
        </TabsContent>
        
        <TabsContent value="companies">
          <p className="text-muted-foreground">Company members will be displayed here</p>
        </TabsContent>
        
        <TabsContent value="board">
          <p className="text-muted-foreground">Board members will be displayed here</p>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default MemberDirectory;
