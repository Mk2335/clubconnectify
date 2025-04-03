
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Mail, Receipt, CheckCircle2 } from "lucide-react";
import { Member } from "@/types/member";
import { useToast } from "@/hooks/use-toast";

interface MemberPayment {
  memberId: string;
  memberName: string;
  email: string;
  lastPaymentDate: string;
  nextPaymentDue: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  paymentMethod: string;
}

interface PaymentStatusProps {
  selectedMembers: string[];
  members: Member[];
}

export function PaymentStatus({ selectedMembers, members }: PaymentStatusProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();
  
  // Mock data - would be replaced with actual API calls
  const memberPayments: MemberPayment[] = [
    {
      memberId: "1",
      memberName: "John Doe",
      email: "john@example.com",
      lastPaymentDate: "2025-03-15",
      nextPaymentDue: "2025-04-15",
      amount: 120,
      status: "paid",
      paymentMethod: "Bank Transfer"
    },
    {
      memberId: "2",
      memberName: "Jane Smith",
      email: "jane@example.com",
      lastPaymentDate: "2025-02-15",
      nextPaymentDue: "2025-03-15",
      amount: 120,
      status: "overdue",
      paymentMethod: "Direct Debit"
    },
    {
      memberId: "3",
      memberName: "Acme Corporation",
      email: "info@acme.com",
      lastPaymentDate: "2025-03-01",
      nextPaymentDue: "2025-04-01",
      amount: 250,
      status: "pending",
      paymentMethod: "Bank Transfer"
    }
  ];
  
  // Filter by selected members and status
  const filteredPayments = memberPayments
    .filter(payment => 
      (selectedMembers.length === 0 || selectedMembers.includes(payment.memberId)) &&
      (statusFilter === "all" || payment.status === statusFilter)
    );

  const handleSendReminder = (memberIds: string[]) => {
    toast({
      title: "Payment Reminders Sent",
      description: `Reminders sent to ${memberIds.length} member(s).`,
    });
  };

  const handleMarkAsPaid = (memberIds: string[]) => {
    toast({
      title: "Payments Marked as Paid",
      description: `${memberIds.length} payment(s) marked as paid.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Up to Date</CardTitle>
            <CardDescription>Members with current payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {memberPayments.filter(p => p.status === "paid").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <CardDescription>Awaiting payment confirmation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {memberPayments.filter(p => p.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <CardDescription>Require immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {memberPayments.filter(p => p.status === "overdue").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Member Payment Status</CardTitle>
          <CardDescription>
            Current payment status for all members
          </CardDescription>
          <div className="flex justify-between items-end mt-4">
            <div className="w-48">
              <Label htmlFor="status-filter">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter" className="mt-1">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSendReminder(filteredPayments
                  .filter(p => p.status === "overdue")
                  .map(p => p.memberId))}
                disabled={!filteredPayments.some(p => p.status === "overdue")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Send Reminders
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => handleMarkAsPaid(selectedMembers)}
                disabled={selectedMembers.length === 0}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark as Paid
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Next Due</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.memberId}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.memberName}</div>
                        <div className="text-xs text-muted-foreground">{payment.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{payment.lastPaymentDate}</TableCell>
                    <TableCell>{payment.nextPaymentDue}</TableCell>
                    <TableCell>{payment.amount.toFixed(2)} €</TableCell>
                    <TableCell>
                      <Badge variant={payment.status}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled={payment.status === "paid"}>
                          <Receipt className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" disabled={payment.status === "paid"}>
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    No payments found matching the current filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
