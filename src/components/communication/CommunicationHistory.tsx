
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
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Member } from "@/types/member";
import { Mail, Search, Eye, History, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CommunicationRecord } from "@/types/communication";
import { useToast } from "@/components/ui/use-toast";

interface CommunicationHistoryProps {
  members: Member[];
}

export function CommunicationHistory({ members }: CommunicationHistoryProps) {
  const [history, setHistory] = useState<CommunicationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingContent, setViewingContent] = useState<string | null>(null);
  const { toast } = useToast();

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Communication History</h2>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search communications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
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
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
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
                    <TableCell>{new Date(record.sentAt).toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setViewingContent(record.content)}
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

      <Dialog open={!!viewingContent} onOpenChange={() => setViewingContent(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Message Content</DialogTitle>
          </DialogHeader>
          <div className="border rounded-md p-4 bg-slate-50">
            <div dangerouslySetInnerHTML={{ __html: viewingContent || "" }} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
