
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Filter,
  History,
  Mail,
  MessageSquare,
  Phone,
  Search,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Member } from "@/types/member";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type CommunicationType = "email" | "phone" | "meeting" | "sms" | "other";

interface Communication {
  id: string;
  memberId: string;
  memberName: string;
  type: CommunicationType;
  subject: string;
  date: Date;
  status: "sent" | "received" | "failed" | "scheduled";
  content?: string;
}

const ITEMS_PER_PAGE = 10;

type TypeIcon = {
  [key in CommunicationType]: JSX.Element;
};

const typeIcons: TypeIcon = {
  email: <Mail className="h-4 w-4" />,
  phone: <Phone className="h-4 w-4" />,
  meeting: <MessageSquare className="h-4 w-4" />,
  sms: <MessageSquare className="h-4 w-4" />,
  other: <MessageSquare className="h-4 w-4" />
};

const statusColors: Record<string, string> = {
  sent: "bg-green-100 text-green-800 hover:bg-green-200",
  received: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  failed: "bg-red-100 text-red-800 hover:bg-red-200",
  scheduled: "bg-amber-100 text-amber-800 hover:bg-amber-200"
};

const mockCommunications: Communication[] = [
  {
    id: "1",
    memberId: "1",
    memberName: "John Doe",
    type: "email",
    subject: "Membership Renewal",
    date: new Date(2024, 2, 15),
    status: "sent",
    content: "Your membership is due for renewal in 30 days."
  },
  {
    id: "2",
    memberId: "2",
    memberName: "Jane Smith",
    type: "email",
    subject: "Welcome to Our Organization",
    date: new Date(2024, 1, 28),
    status: "sent",
    content: "We're excited to welcome you to our organization!"
  },
  {
    id: "3",
    memberId: "3",
    memberName: "Acme Corporation",
    type: "phone",
    subject: "Payment Discussion",
    date: new Date(2024, 2, 10),
    status: "received",
    content: "Call discussing options for payment methods."
  },
  {
    id: "4",
    memberId: "1",
    memberName: "John Doe",
    type: "email",
    subject: "Upcoming Event Information",
    date: new Date(2024, 3, 1),
    status: "sent",
    content: "Details about our upcoming annual meeting."
  },
  {
    id: "5",
    memberId: "4",
    memberName: "Sarah Williams",
    type: "email",
    subject: "Membership Application Status",
    date: new Date(2024, 3, 5),
    status: "scheduled",
    content: "Your application is being processed."
  },
  {
    id: "6",
    memberId: "5",
    memberName: "Tech Innovators Ltd",
    type: "phone",
    subject: "Membership Benefits",
    date: new Date(2024, 2, 20),
    status: "received",
    content: "Discussed available membership benefits and options."
  },
  {
    id: "7",
    memberId: "2",
    memberName: "Jane Smith",
    type: "email",
    subject: "Payment Receipt",
    date: new Date(2024, 2, 25),
    status: "sent",
    content: "Receipt for your recent membership payment."
  }
];

interface CommunicationHistoryProps {
  members: Member[];
}

export function CommunicationHistory({ members }: CommunicationHistoryProps) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [selectedMemberId, setSelectedMemberId] = useState<string>("all");
  
  // Filter communications based on search and filters
  const filteredCommunications = mockCommunications.filter((comm) => {
    // Search filter
    if (
      searchTerm &&
      !comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !comm.memberName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Type filter
    if (typeFilter !== "all" && comm.type !== typeFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== "all" && comm.status !== statusFilter) {
      return false;
    }
    
    // Member filter
    if (selectedMemberId !== "all" && comm.memberId !== selectedMemberId) {
      return false;
    }
    
    // Date range filter
    if (dateRange.from && dateRange.to) {
      const communicationDate = new Date(comm.date);
      if (
        communicationDate < dateRange.from ||
        communicationDate > dateRange.to
      ) {
        return false;
      }
    }
    
    return true;
  });
  
  // Calculate pagination
  const totalItems = filteredCommunications.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentItems = filteredCommunications.slice(startIndex, endIndex);
  
  const resetFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setStatusFilter("all");
    setDateRange({ from: undefined, to: undefined });
    setSelectedMemberId("all");
    setPage(1);
  };
  
  const isFiltering = 
    searchTerm !== "" || 
    typeFilter !== "all" || 
    statusFilter !== "all" || 
    selectedMemberId !== "all" || 
    dateRange.from !== undefined || 
    dateRange.to !== undefined;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <History className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Communication History</h2>
      </div>
      
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="relative w-full sm:w-auto flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search communications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="meeting">Meeting</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              {members.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal w-[130px]",
                  dateRange.from && "text-primary"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "PP")} - {format(dateRange.to, "PP")}
                    </>
                  ) : (
                    format(dateRange.from, "PPP")
                  )
                ) : (
                  <span>Date Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          
          {isFiltering && (
            <Button variant="ghost" size="icon" onClick={resetFilters} title="Clear filters">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isFiltering && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchTerm && (
            <Badge variant="outline" className="flex items-center gap-1">
              Search: {searchTerm}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => setSearchTerm("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {typeFilter !== "all" && (
            <Badge variant="outline" className="flex items-center gap-1">
              Type: {typeFilter}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => setTypeFilter("all")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {statusFilter !== "all" && (
            <Badge variant="outline" className="flex items-center gap-1">
              Status: {statusFilter}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => setStatusFilter("all")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {selectedMemberId !== "all" && (
            <Badge variant="outline" className="flex items-center gap-1">
              Member: {members.find(m => m.id === selectedMemberId)?.name || selectedMemberId}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => setSelectedMemberId("all")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {dateRange.from && dateRange.to && (
            <Badge variant="outline" className="flex items-center gap-1">
              Dates: {format(dateRange.from, "PP")} - {format(dateRange.to, "PP")}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => setDateRange({ from: undefined, to: undefined })}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[200px]">Member</TableHead>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((comm) => (
                <TableRow key={comm.id}>
                  <TableCell className="font-mono">
                    {format(new Date(comm.date), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>{comm.memberName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {typeIcons[comm.type]}
                      <span className="capitalize">{comm.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{comm.subject}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[comm.status]}>
                      {comm.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No communications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center sm:justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
