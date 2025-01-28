import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Invoice {
  id: string | number;
  amount: string;
  date: string;
  recipient: string;
  type: string;
  status: "open" | "partially-posted";
  postedOn?: string;
  openBalance: string;
  hasDetails?: boolean;
}

const invoices: Invoice[] = [
  {
    id: "1",
    amount: "120,00€",
    date: "28.01.2025",
    recipient: "Mustermann & Co. KG",
    type: "Membership fee",
    status: "open",
    postedOn: "Not booked",
    openBalance: "120,00 EUR",
    hasDetails: true
  },
  {
    id: "2",
    amount: "115,00€",
    date: "28.01.2025",
    recipient: "Max Mustermann",
    type: "Membership fee",
    status: "open",
    postedOn: "Not booked",
    openBalance: "115,00 EUR",
    hasDetails: true
  },
  {
    id: "90191026",
    amount: "1.250,00€",
    date: "28.01.2025",
    recipient: "Musterfirma GmbH",
    type: "Earnings",
    status: "partially-posted",
    postedOn: "27.01.2025",
    openBalance: "1.250,00 EUR"
  },
  {
    id: "92246454",
    amount: "1.250,00€",
    date: "28.01.2025",
    recipient: "Musterfirma GmbH",
    type: "Earnings",
    status: "partially-posted",
    postedOn: "27.01.2025",
    openBalance: "1.250,00 EUR"
  }
];

const Invoice = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <SidebarTrigger className="mb-4" />
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Write Invoice
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create document
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Donation certificate
                </Button>
                <div className="flex items-center gap-2 ml-auto">
                  <span>Filter:</span>
                  <Input
                    type="date"
                    className="w-40"
                    defaultValue="2025-01-01"
                  />
                  <span>-</span>
                  <Input
                    type="date"
                    className="w-40"
                    defaultValue="2025-01-31"
                  />
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtering
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice/receipt</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Invoice date</TableHead>
                      <TableHead>Recipient/company</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Posted on</TableHead>
                      <TableHead>Open balance</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.recipient}</TableCell>
                        <TableCell>{invoice.type}</TableCell>
                        <TableCell>
                          <Badge variant={invoice.status === "open" ? "secondary" : "default"}>
                            {invoice.status === "open" ? "Open" : "Partially posted"}
                          </Badge>
                        </TableCell>
                        <TableCell>{invoice.postedOn}</TableCell>
                        <TableCell>
                          <div>
                            {invoice.openBalance}
                            {invoice.status === "partially-posted" && (
                              <div className="text-xs text-muted-foreground">
                                (Total of all linked documents and postings)
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            {invoice.hasDetails && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-between items-center p-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" disabled>
                      Previous
                    </Button>
                    <Button variant="default">1</Button>
                    <Button variant="outline">Next</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Showing 1 to 4 of 4 entries</span>
                    <Select defaultValue="20">
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Invoice;