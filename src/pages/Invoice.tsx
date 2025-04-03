
import { useState } from "react";
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
import { FileText, Plus, Download, Filter, Printer, Share2, FileBarChart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { downloadCSV } from "@/utils/exportUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

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
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-01-31");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showInvoiceDetail, setShowInvoiceDetail] = useState(false);
  
  const filteredInvoices = invoices.filter(invoice => 
    invoice.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.id.toString().includes(searchQuery) ||
    invoice.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = (format: string) => {
    if (format === 'csv') {
      const data = filteredInvoices.map(invoice => ({
        id: invoice.id,
        amount: invoice.amount,
        date: invoice.date,
        recipient: invoice.recipient,
        type: invoice.type,
        status: invoice.status,
        postedOn: invoice.postedOn || '',
        openBalance: invoice.openBalance
      }));
      
      downloadCSV(data, `invoices-${new Date().toISOString().split('T')[0]}.csv`);
      
      toast({
        title: "Export Successful",
        description: "Invoices exported as CSV."
      });
    } else {
      // For other formats (which would be implemented in a real app)
      toast({
        title: `${format.toUpperCase()} Export`,
        description: `${format.toUpperCase()} export will be available soon.`
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Invoices',
        text: 'Check out our invoices',
        url: window.location.href,
      }).catch(error => {
        console.error('Share error:', error);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link Copied",
          description: "Invoices page URL copied to clipboard",
        });
      });
    }
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation",
      description: "Custom report generation will be available soon."
    });
  };

  const handleViewInvoiceDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetail(true);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <SidebarTrigger className="mb-4" />
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className={isMobile ? "sr-only" : ""}>Write Invoice</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span className={isMobile ? "sr-only" : ""}>Create document</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span className={isMobile ? "sr-only" : ""}>Donation certificate</span>
                  </Button>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="Search invoices..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 w-full sm:w-64"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={isMobile ? "sr-only" : ""}>Date:</span>
                    <Input
                      type="date"
                      className="w-full sm:w-32"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span className={isMobile ? "sr-only" : ""}>-</span>
                    <Input
                      type="date"
                      className="w-full sm:w-32"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className={isMobile ? "sr-only" : ""}>Filtering</span>
                  </Button>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2 justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span className={isMobile ? "sr-only" : ""}>Export</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleExport('csv')}>
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('pdf')}>
                      Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('xlsx')}>
                      Export as Excel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  <span className={isMobile ? "sr-only" : ""}>Print</span>
                </Button>
                
                <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  <span className={isMobile ? "sr-only" : ""}>Share</span>
                </Button>
                
                <Button variant="outline" onClick={handleGenerateReport} className="flex items-center gap-2">
                  <FileBarChart className="h-4 w-4" />
                  <span className={isMobile ? "sr-only" : ""}>Report</span>
                </Button>
              </div>

              <div className="bg-white rounded-lg shadow">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice/receipt</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className={isMobile ? "hidden" : ""}>Invoice date</TableHead>
                      <TableHead>Recipient/company</TableHead>
                      <TableHead className={isMobile ? "hidden" : ""}>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className={isMobile ? "hidden" : ""}>Posted on</TableHead>
                      <TableHead className={isMobile ? "hidden" : ""}>Open balance</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell className={isMobile ? "hidden" : ""}>{invoice.date}</TableCell>
                        <TableCell>{invoice.recipient}</TableCell>
                        <TableCell className={isMobile ? "hidden" : ""}>{invoice.type}</TableCell>
                        <TableCell>
                          <Badge variant={invoice.status === "open" ? "secondary" : "default"}>
                            {invoice.status === "open" ? "Open" : "Partially posted"}
                          </Badge>
                        </TableCell>
                        <TableCell className={isMobile ? "hidden" : ""}>{invoice.postedOn}</TableCell>
                        <TableCell className={isMobile ? "hidden" : ""}>
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
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewInvoiceDetails(invoice)}
                            >
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
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t">
                  <div className="flex gap-2 mb-4 sm:mb-0">
                    <Button variant="outline" disabled>
                      Previous
                    </Button>
                    <Button variant="default">1</Button>
                    <Button variant="outline">Next</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Showing 1 to {filteredInvoices.length} of {filteredInvoices.length} entries</span>
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

      <Dialog open={showInvoiceDetail} onOpenChange={setShowInvoiceDetail}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Invoice Number</p>
                  <p>{selectedInvoice.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                  <p>{selectedInvoice.amount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{selectedInvoice.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Recipient</p>
                  <p>{selectedInvoice.recipient}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p>{selectedInvoice.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p><Badge variant={selectedInvoice.status === "open" ? "secondary" : "default"}>
                    {selectedInvoice.status === "open" ? "Open" : "Partially posted"}
                  </Badge></p>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => window.print()}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default Invoice;
