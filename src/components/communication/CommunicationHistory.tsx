
import React, { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Member } from "@/types/member";
import { Mail, Search, Eye, History, AlertCircle, CheckCircle, Clock, Download, Printer, Share2, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CommunicationRecord } from "@/types/communication";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface CommunicationHistoryProps {
  members: Member[];
}

export function CommunicationHistory({ members }: CommunicationHistoryProps) {
  const [history, setHistory] = useState<CommunicationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingContent, setViewingContent] = useState<string | null>(null);
  const [viewingRecord, setViewingRecord] = useState<CommunicationRecord | null>(null);
  const [exportLoading, setExportLoading] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchCommunicationHistory();
  }, []);

  const fetchCommunicationHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("communication_history")
        .select("*")
        .order("sent_at", { ascending: false });

      if (error) throw error;

      const formattedData: CommunicationRecord[] = data.map((record: any) => ({
        id: record.id,
        type: record.type,
        subject: record.subject,
        content: record.content,
        recipients: record.recipients || [],
        sentAt: record.sent_at,
        sentBy: record.sent_by,
        status: record.status,
      }));

      setHistory(formattedData);
    } catch (error) {
      console.error("Error fetching communication history:", error);
      toast({
        title: "Error",
        description: "Failed to load communication history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter((record) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      record.subject.toLowerCase().includes(searchTerm) ||
      (record.recipients.some(email => email.toLowerCase().includes(searchTerm)))
    );
  });

  // Get member name from email
  const getMemberName = (email: string) => {
    const member = members.find((m) => m.email === email);
    return member ? member.name : email;
  };

  // Format recipients list
  const formatRecipients = (recipients: string[]) => {
    if (recipients.length <= 2) {
      return recipients.map(email => getMemberName(email)).join(", ");
    } else {
      return `${getMemberName(recipients[0])}, ${getMemberName(recipients[1])} +${recipients.length - 2} more`;
    }
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>Sent</span>
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>Failed</span>
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Pending</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  const handleViewMessage = (record: CommunicationRecord) => {
    setViewingContent(record.content);
    setViewingRecord(record);
  };

  const handleExportCSV = async () => {
    setExportLoading(true);
    try {
      // Format the data for CSV
      const csvData = history.map(record => ({
        id: record.id,
        type: record.type,
        subject: record.subject,
        recipients: record.recipients.join(", "),
        date: new Date(record.sentAt).toLocaleString(),
        status: record.status
      }));
      
      // Use the utility function to download
      await downloadCSV(csvData, `communication_history_${new Date().toISOString().split('T')[0]}.csv`);
      
      toast({
        title: "Export Successful",
        description: "Communication history exported as CSV.",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "Could not export communication history.",
        variant: "destructive",
      });
    } finally {
      setExportLoading(false);
    }
  };

  const downloadCSV = (data: any[], filename: string) => {
    import('@/utils/exportUtils').then(module => {
      module.downloadCSV(data, filename);
    });
  };

  const handlePrintRecord = () => {
    if (!viewingContent) return;
    
    // Create a printable version
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Print Failed",
        description: "Could not open print window. Please check your popup settings.",
        variant: "destructive",
      });
      return;
    }
    
    const record = viewingRecord;
    if (!record) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${record.subject}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { margin-bottom: 20px; }
            .content { border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>${record.subject}</h2>
            <p>Date: ${new Date(record.sentAt).toLocaleString()}</p>
            <p>Recipients: ${record.recipients.join(", ")}</p>
            <p>Status: ${record.status}</p>
          </div>
          <div class="content">
            ${record.content}
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Print after a short delay to ensure content is loaded
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const handleShareRecord = () => {
    if (!viewingRecord) return;
    
    // Using the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: viewingRecord.subject,
        text: `Communication: ${viewingRecord.subject}`,
        url: window.location.href
      }).catch(error => {
        console.error('Share error:', error);
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`
Subject: ${viewingRecord.subject}
Sent: ${new Date(viewingRecord.sentAt).toLocaleString()}
Recipients: ${viewingRecord.recipients.join(", ")}
Status: ${viewingRecord.status}
      `).then(() => {
        toast({
          title: "Copied to Clipboard",
          description: "Message details copied to clipboard.",
        });
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    }
  };

  const handleGenerateReport = () => {
    // This would be expanded in a real implementation
    toast({
      title: "Report Generation",
      description: "Custom report generation will be available soon.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Communication History</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search communications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <FileText className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportCSV} disabled={exportLoading}>
                <Download className="h-4 w-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleGenerateReport}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      ) : filteredHistory.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              {searchQuery ? "No communications match your search" : "No communication history yet"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={isMobile ? "hidden" : ""}>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead className={isMobile ? "hidden" : ""}>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className={isMobile ? "hidden" : ""}>
                      <div className="flex items-center gap-2">
                        {record.type === "email" ? (
                          <Mail className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <span className="capitalize">{record.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{record.subject}</TableCell>
                    <TableCell>{formatRecipients(record.recipients)}</TableCell>
                    <TableCell className={isMobile ? "hidden" : ""}>{new Date(record.sentAt).toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewMessage(record)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={!!viewingContent} onOpenChange={() => {
        setViewingContent(null);
        setViewingRecord(null);
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Message Content</DialogTitle>
            <div className="flex items-center gap-1 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handlePrintRecord}
              >
                <Printer className="h-4 w-4" />
                <span className={isMobile ? "sr-only" : ""}>Print</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleShareRecord}
              >
                <Share2 className="h-4 w-4" />
                <span className={isMobile ? "sr-only" : ""}>Share</span>
              </Button>
            </div>
          </DialogHeader>
          <div className="border rounded-md p-4 bg-slate-50">
            <div dangerouslySetInnerHTML={{ __html: viewingContent || "" }} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
