import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  UserPlus, 
  Users,
  HelpCircle,
  Settings,
  Filter
} from "lucide-react";

interface Member {
  id: number;
  name: string;
  email: string;
  group: string;
  address: string;
  payment: string;
  shares: number;
}

const initialMembers: Member[] = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@example.com", 
    group: "Regular Member",
    address: "123 Main St, City",
    payment: "Active",
    shares: 100
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane@example.com", 
    group: "Board Member",
    address: "456 Oak Ave, Town",
    payment: "Active",
    shares: 150
  },
  { 
    id: 3, 
    name: "Mike Johnson", 
    email: "mike@example.com", 
    group: "Regular Member",
    address: "789 Pine Rd, Village",
    payment: "Inactive",
    shares: 75
  },
];

export const MemberList = () => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Members</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" title="Help">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Actions">
            <Settings className="h-4 w-4" />
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-accent" : ""}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Shares</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.id}</TableCell>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.group}</TableCell>
                <TableCell>{member.address}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    member.payment === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {member.payment}
                  </span>
                </TableCell>
                <TableCell className="text-right">{member.shares}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};