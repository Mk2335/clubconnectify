
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailIntegration } from "./EmailIntegration";
import { NotificationSettings } from "./NotificationSettings";
import { CommunicationHistory } from "./CommunicationHistory";
import { PaymentTracking } from "../finances/PaymentTracking";
import { InvoiceGeneration } from "../finances/InvoiceGeneration";
import { PaymentStatus } from "../finances/PaymentStatus";
import { Member } from "@/types/member";
import { Mail, Bell, History, Receipt, FileText, CreditCard } from "lucide-react";

interface MemberCommunicationTabsProps {
  members: Member[];
  selectedMembers: string[];
}

export function MemberCommunicationTabs({ members, selectedMembers }: MemberCommunicationTabsProps) {
  const [activeTab, setActiveTab] = useState("email");
  const [activeFinanceTab, setActiveFinanceTab] = useState("payment-tracking");
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
          <TabsTrigger value="finances" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            <span>Finances</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="mt-0">
          <EmailIntegration selectedMembers={selectedMembers} />
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-0">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="history" className="mt-0">
          <CommunicationHistory members={members} />
        </TabsContent>

        <TabsContent value="finances" className="mt-0">
          <Tabs 
            defaultValue="payment-tracking" 
            value={activeFinanceTab} 
            onValueChange={setActiveFinanceTab}
            className="w-full"
          >
            <TabsList className="mb-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
