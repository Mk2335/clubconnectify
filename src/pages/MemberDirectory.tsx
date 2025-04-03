
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid3X3, ListFilter, List, MapPin, User, Building, Users, X } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Member } from "@/types/member";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { HighlightedText } from "@/components/member-list/SearchUtils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

const MemberDirectory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('members')
          .select(`
            *,
            company_details(*)
          `);

        if (error) {
          throw error;
        }

        // Transform data to match our Member type
        const transformedMembers: Member[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          status: item.status,
          joinDate: item.join_date,
          profilePicture: item.profile_picture || "",
          role: item.role || "",
          type: item.type,
          companyDetails: item.company_details ? {
            companyName: item.company_details.company_name,
            registrationNumber: item.company_details.registration_number || "",
            contactPerson: item.company_details.contact_person || ""
          } : undefined
        }));

        setMembers(transformedMembers);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);
  
  const filteredMembers = members.filter(member => {
    // Apply tab filter
    if (activeTab === "individuals" && member.type !== "Individual") return false;
    if (activeTab === "companies" && member.type !== "Company") return false;
    if (activeTab === "board" && !member.role?.toLowerCase().includes("board")) return false;
    
    // Apply search filter
    if (searchQuery) {
      return member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.role && member.role.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    return true;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getAvatarColor = (id: string) => {
    // Generate a consistent color based on the id
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-amber-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-rose-500",
      "bg-teal-500",
    ];
    
    // Simple hash function to pick a color
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const handleViewMember = (memberId: string) => {
    // Navigate to member detail page
    console.log(`View member ${memberId}`);
    // In a real app, you would navigate to a member detail page
  };

  if (loading) {
    return (
      <AppLayout title="Member Directory">
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Member Directory">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>All Members</span>
            </TabsTrigger>
            <TabsTrigger value="individuals" className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>Individuals</span>
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-1.5">
              <Building className="h-4 w-4" />
              <span>Companies</span>
            </TabsTrigger>
            <TabsTrigger value="board" className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>Board Members</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            <Button 
              variant={viewMode === "grid" ? "default" : "outline"} 
              size="icon" 
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="icon" 
              onClick={() => setViewMode("list")}
              title="List view"
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
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListFilter className="h-4 w-4" />
                Filter
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-full h-5 w-5 p-0 flex items-center justify-center">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filter Members</h4>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Status</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant={activeFilters.includes("Active") ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleFilter("Active")}
                    >
                      Active
                    </Badge>
                    <Badge 
                      variant={activeFilters.includes("Inactive") ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleFilter("Inactive")}
                    >
                      Inactive
                    </Badge>
                    <Badge 
                      variant={activeFilters.includes("Pending") ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleFilter("Pending")}
                    >
                      Pending
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Role</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant={activeFilters.includes("Board") ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleFilter("Board")}
                    >
                      Board
                    </Badge>
                    <Badge 
                      variant={activeFilters.includes("AM") ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleFilter("AM")}
                    >
                      AM
                    </Badge>
                    <Badge 
                      variant={activeFilters.includes("ERW") ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleFilter("ERW")}
                    >
                      ERW
                    </Badge>
                    <Badge 
                      variant={activeFilters.includes("S") ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleFilter("S")}
                    >
                      S
                    </Badge>
                  </div>
                </div>
                
                {activeFilters.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveFilters([])}
                    className="text-xs flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear all filters
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            <div className="text-sm text-muted-foreground py-1">Active filters:</div>
            {activeFilters.map(filter => (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                {filter}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => toggleFilter(filter)} 
                />
              </Badge>
            ))}
          </div>
        )}
        
        <TabsContent value="all">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="h-full transition-all hover:shadow-md overflow-hidden">
                  <div className={`h-2 w-full ${member.status === "Active" ? "bg-green-500" : member.status === "Pending" ? "bg-amber-500" : "bg-gray-300"}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className={`h-12 w-12 ${member.profilePicture ? "" : getAvatarColor(member.id)}`}>
                          <AvatarImage src={member.profilePicture} alt={member.name} />
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className="font-medium text-lg">
                            {searchQuery ? (
                              <HighlightedText text={member.name} searchQuery={searchQuery} />
                            ) : (
                              member.name
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {searchQuery ? (
                              <HighlightedText text={member.email} searchQuery={searchQuery} />
                            ) : (
                              member.email
                            )}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground mb-2">
                            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                              member.status === "Active" ? "bg-green-500" : 
                              member.status === "Pending" ? "bg-amber-500" : "bg-gray-400"
                            }`}></span>
                            {member.status}
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewMember(member.id)}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center">
                        {member.role && (
                          <Badge variant="outline" className="mr-2">
                            {searchQuery ? (
                              <HighlightedText text={member.role} searchQuery={searchQuery} />
                            ) : (
                              member.role
                            )}
                          </Badge>
                        )}
                        <Badge variant="secondary">
                          {member.type}
                        </Badge>
                      </div>
                      
                      {member.type === "Company" && member.companyDetails && (
                        <div className="mt-3 pt-3 border-t text-sm">
                          <p className="font-medium">{member.companyDetails.companyName}</p>
                          <p className="text-sm text-muted-foreground">
                            Contact: {member.companyDetails.contactPerson}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground pt-3 border-t">
                      <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="p-0 h-auto font-normal text-xs"
                        onClick={() => handleViewMember(member.id)}
                      >
                        View Profile →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewMember(member.id)}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className={`h-8 w-8 ${member.profilePicture ? "" : getAvatarColor(member.id)}`}>
                            <AvatarImage src={member.profilePicture} alt={member.name} />
                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {searchQuery ? (
                                <HighlightedText text={member.name} searchQuery={searchQuery} />
                              ) : (
                                member.name
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {searchQuery ? (
                                <HighlightedText text={member.email} searchQuery={searchQuery} />
                              ) : (
                                member.email
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {member.role ? (
                          searchQuery ? (
                            <HighlightedText text={member.role} searchQuery={searchQuery} />
                          ) : (
                            member.role
                          )
                        ) : (
                          <span className="text-muted-foreground text-xs">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell>{member.type}</TableCell>
                      <TableCell>
                        <span className="flex items-center">
                          <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                            member.status === "Active" ? "bg-green-500" : 
                            member.status === "Pending" ? "bg-amber-500" : "bg-gray-400"
                          }`}></span>
                          {member.status}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 hover:bg-transparent hover:underline p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewMember(member.id);
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredMembers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No members match your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {filteredMembers.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredMembers.length} of {members.length} members
              </p>
              <Button variant="outline" size="sm">Export Directory</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="individuals">
          {/* Same content pattern as "all" tab but filtered for individuals */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Individual member cards would go here - using the same card structure */}
              {filteredMembers.length === 0 && (
                <div className="col-span-3 py-8 text-center text-muted-foreground">
                  No individual members match your criteria
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              {/* Individual member table would go here - using the same table structure */}
              {filteredMembers.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No individual members match your criteria
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="companies">
          {/* Same content pattern as "all" tab but filtered for companies */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Company member cards would go here - using the same card structure */}
              {filteredMembers.length === 0 && (
                <div className="col-span-3 py-8 text-center text-muted-foreground">
                  No company members match your criteria
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              {/* Company member table would go here - using the same table structure */}
              {filteredMembers.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No company members match your criteria
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="board">
          {/* Same content pattern as "all" tab but filtered for board members */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Board member cards would go here - using the same card structure */}
              {filteredMembers.length === 0 && (
                <div className="col-span-3 py-8 text-center text-muted-foreground">
                  No board members match your criteria
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              {/* Board member table would go here - using the same table structure */}
              {filteredMembers.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No board members match your criteria
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default MemberDirectory;
