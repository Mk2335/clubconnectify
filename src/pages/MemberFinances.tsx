
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentTracking } from "@/components/finances/PaymentTracking";
import { InvoiceGeneration } from "@/components/finances/InvoiceGeneration";
import { PaymentStatus } from "@/components/finances/PaymentStatus";
import { useState } from "react";
import { Member } from "@/types/member";
import { CreditCard, FileText, Receipt } from "lucide-react";

const MemberFinances = () => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [members, setMembers] = useState<Member[]>([
    // You can add mock members here or fetch from an actual source
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      joinDate: "2024-01-15",
      type: "Individual"
    }
  ]);

  return (
    <AppLayout title="Member Finances">
      <Tabs defaultValue="payment-tracking" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="payment-tracking" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Payment Tracking</span>
          </TabsTrigger>
          <TabsTrigger value="invoice-generation" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Invoice Generation</span>
          </TabsTrigger>
          <TabsTrigger value="payment-status" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            <span>Payment Status</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment-tracking" className="mt-0">
          <PaymentTracking selectedMembers={selectedMembers} />
        </TabsContent>
        
        <TabsContent value="invoice-generation" className="mt-0">
          <InvoiceGeneration selectedMembers={selectedMembers} />
        </TabsContent>
        
        <TabsContent value="payment-status" className="mt-0">
          <PaymentStatus selectedMembers={selectedMembers} members={members} />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default MemberFinances;
