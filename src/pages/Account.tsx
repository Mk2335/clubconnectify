import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Filter, CalendarRange } from "lucide-react";

interface Transaction {
  id: string;
  amount: string;
  contraAccount: string;
  account: string;
  purpose: string;
  date: string;
  transactionNumber: string;
  department: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    amount: "EUR 1,253.00",
    contraAccount: "Tina Mutterfrau",
    account: "MB",
    purpose: "Return debit note",
    date: "1/28/2025",
    transactionNumber: "92396101",
    department: "Project A",
  },
];

export default function Account() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <SidebarTrigger className="mb-4" />
            
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Account Management</h1>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All accounts</TabsTrigger>
                <TabsTrigger value="handkasse">Handkasse</TabsTrigger>
                <TabsTrigger value="membership">Membership Fees</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="flex gap-4 items-center">
                  <Button variant="outline" className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Posting add
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Bank account add
                  </Button>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-sm text-muted-foreground">Filter:</span>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter Active
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <CalendarRange className="h-4 w-4" />
                      01.01.2025 - 31.01.2025
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Amount</TableHead>
                        <TableHead>Contra account/holder</TableHead>
                        <TableHead>Account</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Transaction number</TableHead>
                        <TableHead>Department/Project</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.amount}</TableCell>
                          <TableCell>{transaction.contraAccount}</TableCell>
                          <TableCell>{transaction.account}</TableCell>
                          <TableCell>{transaction.purpose}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.transactionNumber}</TableCell>
                          <TableCell>{transaction.department}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Book Now
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                  <span>Showing 1 to 1 of 1 entries (filtered from 6 total entries)</span>
                </div>
              </TabsContent>

              <TabsContent value="handkasse">
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  Handkasse content coming soon
                </div>
              </TabsContent>

              <TabsContent value="membership">
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  Membership Fees content coming soon
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}