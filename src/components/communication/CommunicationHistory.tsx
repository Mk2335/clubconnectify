
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Member } from "@/types/member";
import { HighlightedText } from "../member-list/SearchUtils";
import { Search, Filter, Calendar, Mail, ArrowDown, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CommunicationHistoryProps {
  members: Member[];
}

type Communication = {
  id: string;
  date: string;
  type: "email" | "notification" | "sms";
  subject: string;
  recipient: string;
  status: "delivered" | "read" | "failed" | "pending";
};

export function CommunicationHistory({ members }: CommunicationHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<keyof Communication>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState("list");

  // Sample communication history data
  const communicationHistory: Communication[] = [
    {
      id: "1",
      date: "2024-04-01T10:30:00",
      type: "email",
      subject: "April Newsletter",
      recipient: "All Members",
      status: "delivered"
    },
    {
      id: "2",
      date: "2024-03-28T14:15:00",
      type: "notification",
      subject: "New Event Announcement",
      recipient: "Active Members",
      status: "read"
    },
    {
      id: "3",
      date: "2024-03-25T09:00:00",
      type: "email",
      subject: "Payment Reminder",
      recipient: "John Doe",
      status: "read"
    },
    {
      id: "4",
      date: "2024-03-20T11:45:00",
      type: "sms",
      subject: "Urgent Meeting",
      recipient: "Board Members",
      status: "delivered"
    },
    {
      id: "5",
      date: "2024-03-15T16:30:00",
      type: "email",
      subject: "Membership Renewal",
      recipient: "Jane Smith",
      status: "failed"
    }
  ];

  const handleSort = (field: keyof Communication) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredCommunications = communicationHistory
    .filter(comm => {
      if (typeFilter !== "all" && comm.type !== typeFilter) return false;
      if (statusFilter !== "all" && comm.status !== statusFilter) return false;
      if (searchQuery) {
        return comm.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comm.recipient.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => {
      if (sortField === "date") {
        return sortDirection === "asc" 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      
      const aValue = String(a[sortField]);
      const bValue = String(b[sortField]);
      
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  const getStatusBadge = (status: Communication["status"]) => {
    switch (status) {
      case "delivered":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Delivered</Badge>;
      case "read":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Read</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const renderSortIcon = (field: keyof Communication) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ArrowUp className="h-3 w-3 inline ml-1" /> : <ArrowDown className="h-3 w-3 inline ml-1" />;
  };

  const getCommunicationTypeIcon = (type: Communication["type"]) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />;
      case "notification":
        return <Bell className="h-4 w-4 text-amber-500" />;
      case "sms":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Communication History</h2>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="Search communications..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="notification">Notification</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-1">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort("date")}>
                    Date {renderSortIcon("date")}
                  </TableHead>
                  <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort("type")}>
                    Type {renderSortIcon("type")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("subject")}>
                    Subject {renderSortIcon("subject")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("recipient")}>
                    Recipient {renderSortIcon("recipient")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                    Status {renderSortIcon("status")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommunications.length > 0 ? (
                  filteredCommunications.map((comm) => (
                    <TableRow key={comm.id} className="hover:bg-gray-50">
                      <TableCell>{formatDate(comm.date)}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        {getCommunicationTypeIcon(comm.type)}
                        <span className="capitalize">{comm.type}</span>
                      </TableCell>
                      <TableCell>
                        {searchQuery ? (
                          <HighlightedText text={comm.subject} searchQuery={searchQuery} />
                        ) : (
                          comm.subject
                        )}
                      </TableCell>
                      <TableCell>
                        {searchQuery ? (
                          <HighlightedText text={comm.recipient} searchQuery={searchQuery} />
                        ) : (
                          comm.recipient
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(comm.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No communications match your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Communication Types</CardTitle>
                <CardDescription>Distribution of communication channels</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center p-6">
                <div className="h-40 w-40 rounded-full border-8 border-primary/30 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-8 border-t-primary border-r-primary border-transparent rotate-45"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">60%</div>
                    <div className="text-sm text-muted-foreground">Emails</div>
                  </div>
                </div>
                <div className="w-full flex justify-around mt-6">
                  <div className="text-center">
                    <div className="text-sm font-medium">30%</div>
                    <div className="text-xs text-muted-foreground">Notifications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">10%</div>
                    <div className="text-xs text-muted-foreground">SMS</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Delivery Status</CardTitle>
                <CardDescription>Success rate of communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Delivered</div>
                      <div className="text-sm text-muted-foreground">65%</div>
                    </div>
                    <div className="h-2 bg-muted rounded overflow-hidden">
                      <div className="h-full bg-green-500 w-[65%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Read</div>
                      <div className="text-sm text-muted-foreground">25%</div>
                    </div>
                    <div className="h-2 bg-muted rounded overflow-hidden">
                      <div className="h-full bg-blue-500 w-[25%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Failed</div>
                      <div className="text-sm text-muted-foreground">7%</div>
                    </div>
                    <div className="h-2 bg-muted rounded overflow-hidden">
                      <div className="h-full bg-red-500 w-[7%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Pending</div>
                      <div className="text-sm text-muted-foreground">3%</div>
                    </div>
                    <div className="h-2 bg-muted rounded overflow-hidden">
                      <div className="h-full bg-amber-500 w-[3%]"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCommunications.slice(0, 3).map(comm => (
                    <div key={comm.id} className="flex items-start gap-2 pb-2 border-b last:border-b-0">
                      {getCommunicationTypeIcon(comm.type)}
                      <div>
                        <div className="font-medium text-sm">{comm.subject}</div>
                        <div className="text-xs text-muted-foreground">
                          {comm.recipient} • {formatDate(comm.date)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="link" className="text-xs px-0">View all communications</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Need to import these icons
import { Bell, MessageSquare } from "lucide-react";
