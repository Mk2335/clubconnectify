
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { CheckedState } from "@radix-ui/react-checkbox";

const MemberApplications = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    street: "",
    additional_address: "",
    zip_code: "",
    city: "",
    email: "",
    tax_id: "",
    shares: 1,
    membership_type: "new" as "new" | "existing",
    member_id: "",
    accept_terms: false as CheckedState,
    accept_notice: false as CheckedState,
    is_investing_member: false as CheckedState,
    accept_liability: false as CheckedState,
    accept_fees: false as CheckedState,
    accept_documents: false as CheckedState,
  });

  const handleChange = (field: string, value: string | number | CheckedState) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert CheckedState to boolean for Supabase
      const dataToSubmit = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        street: formData.street,
        additional_address: formData.additional_address,
        zip_code: formData.zip_code,
        city: formData.city,
        email: formData.email,
        tax_id: formData.tax_id,
        shares: formData.shares,
        membership_type: formData.membership_type,
        member_id: formData.member_id,
        accept_terms: Boolean(formData.accept_terms),
        accept_notice: Boolean(formData.accept_notice),
        is_investing_member: Boolean(formData.is_investing_member),
        accept_liability: Boolean(formData.accept_liability),
        accept_fees: Boolean(formData.accept_fees),
        accept_documents: Boolean(formData.accept_documents),
      };
      
      const { data, error } = await supabase
        .from('member_applications')
        .insert([dataToSubmit]);
      
      if (error) throw error;
      
      toast({
        title: "Application Submitted",
        description: "Your membership application has been submitted successfully.",
      });
      
      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        street: "",
        additional_address: "",
        zip_code: "",
        city: "",
        email: "",
        tax_id: "",
        shares: 1,
        membership_type: "new",
        member_id: "",
        accept_terms: false,
        accept_notice: false,
        is_investing_member: false,
        accept_liability: false,
        accept_fees: false,
        accept_documents: false,
      });
      
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout title="Member Applications">
      <Card>
        <CardHeader>
          <CardTitle>Apply for Membership</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={formData.first_name}
                  onChange={(e) => handleChange("first_name", e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={formData.last_name}
                  onChange={(e) => handleChange("last_name", e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street and House Number</Label>
              <Input 
                id="street" 
                value={formData.street}
                onChange={(e) => handleChange("street", e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalAddress">Additional Address Information</Label>
              <Input 
                id="additionalAddress" 
                value={formData.additional_address}
                onChange={(e) => handleChange("additional_address", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input 
                  id="zipCode" 
                  value={formData.zip_code}
                  onChange={(e) => handleChange("zip_code", e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID (if available)</Label>
              <Input 
                id="taxId" 
                value={formData.tax_id}
                onChange={(e) => handleChange("tax_id", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shares">Number of Shares</Label>
              <Input 
                id="shares" 
                type="number" 
                min="1" 
                value={formData.shares}
                onChange={(e) => handleChange("shares", parseInt(e.target.value))}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="membershipType">Membership Type</Label>
              <Select 
                value={formData.membership_type}
                onValueChange={(value) => handleChange("membership_type", value as "new" | "existing")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select membership type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Member</SelectItem>
                  <SelectItem value="existing">Existing Member</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.membership_type === "existing" && (
              <div className="space-y-2">
                <Label htmlFor="memberId">Member ID</Label>
                <Input 
                  id="memberId" 
                  value={formData.member_id}
                  onChange={(e) => handleChange("member_id", e.target.value)}
                  required={formData.membership_type === "existing"}
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="acceptTerms" 
                  checked={formData.accept_terms}
                  onCheckedChange={(checked) => handleChange("accept_terms", checked)}
                  required 
                />
                <Label htmlFor="acceptTerms">
                  I accept the terms and conditions of the cooperative
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="acceptNotice" 
                  checked={formData.accept_notice}
                  onCheckedChange={(checked) => handleChange("accept_notice", checked)}
                  required 
                />
                <Label htmlFor="acceptNotice">
                  I acknowledge notice of the statute and statement of member's shares
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isInvestingMember" 
                  checked={formData.is_investing_member}
                  onCheckedChange={(checked) => handleChange("is_investing_member", checked)}
                />
                <Label htmlFor="isInvestingMember">
                  I want to join as an investing member
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="acceptLiability" 
                  checked={formData.accept_liability}
                  onCheckedChange={(checked) => handleChange("accept_liability", checked)}
                  required 
                />
                <Label htmlFor="acceptLiability">
                  I understand my liability for cooperative debts is limited to my shares
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="acceptFees" 
                  checked={formData.accept_fees}
                  onCheckedChange={(checked) => handleChange("accept_fees", checked)}
                  required 
                />
                <Label htmlFor="acceptFees">
                  I agree to pay the membership fee and share price
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="acceptDocuments" 
                  checked={formData.accept_documents}
                  onCheckedChange={(checked) => handleChange("accept_documents", checked)}
                  required 
                />
                <Label htmlFor="acceptDocuments">
                  I confirm all submitted documents are true and correct
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default MemberApplications;
