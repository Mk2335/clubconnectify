
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

export interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
}

export function MemberList({ searchQuery = "" }: { searchQuery?: string }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [importEmail, setImportEmail] = useState("");
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [newMember, setNewMember] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    zip_code: "",
    phone: "",
    status: "Active"
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('address_book')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        setMembers(data);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleImport = async () => {
    if (!importEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address to import.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simulate an API call to import a member
      const newMember = {
        first_name: "Imported",
        last_name: "Member",
        email: importEmail,
        street: "Sample Street",
        additional_address: "",
        zip_code: "12345",
        city: "Sample City",
        phone: "",
        status: "Active"
      };

      const { data, error } = await supabase
        .from('address_book')
        .insert([newMember])
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Member with email ${importEmail} imported successfully.`,
      });
      
      setImportEmail("");
      fetchMembers();
    } catch (error) {
      console.error('Error importing member:', error);
      toast({
        title: "Error",
        description: "Failed to import member. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMember = async () => {
    // Validate required fields
    if (!newMember.first_name || !newMember.last_name || !newMember.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('address_book')
        .insert([newMember])
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Member ${newMember.first_name} ${newMember.last_name} added successfully.`,
      });
      
      // Reset form and close sheet
      setNewMember({
        first_name: "",
        last_name: "",
        email: "",
        street: "",
        city: "",
        zip_code: "",
        phone: "",
        status: "Active"
      });
      setShowAddSheet(false);
      fetchMembers();
    } catch (error) {
      console.error('Error adding member:', error);
      toast({
        title: "Error",
        description: "Failed to add member. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredMembers = members.filter((member) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      member.first_name.toLowerCase().includes(searchLower) ||
      member.last_name.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Members</h2>
        <Button variant="outline" onClick={() => setShowAddSheet(true)}>Add New Member</Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Email address to import"
          value={importEmail}
          onChange={(e) => setImportEmail(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleImport}>Import</Button>
      </div>

      <div className="border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">Loading...</td>
              </tr>
            ) : filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">No members found</td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.first_name} {member.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{member.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Member Sheet */}
      <Sheet open={showAddSheet} onOpenChange={setShowAddSheet}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Add New Member</SheetTitle>
            <SheetDescription>
              Fill in the details to add a new member to the cooperative.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={newMember.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={newMember.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newMember.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                name="street"
                value={newMember.street}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="zip_code">ZIP Code</Label>
                <Input
                  id="zip_code"
                  name="zip_code"
                  value={newMember.zip_code}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={newMember.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={newMember.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <SheetFooter className="sm:justify-end">
            <SheetClose asChild>
              <Button variant="outline" className="mr-2">Cancel</Button>
            </SheetClose>
            <Button type="submit" onClick={handleAddMember}>Add Member</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
