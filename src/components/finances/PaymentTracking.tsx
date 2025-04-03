
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
import { Progress } from "@/components/ui/progress";
import { Member } from "@/types/member";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Payment {
  id: string;
  memberId: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
  description: string;
}

interface PaymentTrackingProps {
  selectedMembers: string[];
}

export function PaymentTracking({ selectedMembers }: PaymentTrackingProps) {
  const [dateFilter, setDateFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data - would be replaced with actual API calls
  const payments: Payment[] = [
    { 
      id: "1", 
      memberId: "1", 
      amount: 120, 
      date: "2025-03-15", 
      status: "paid", 
      description: "Monthly Membership Fee" 
    },
    { 
      id: "2", 
      memberId: "2", 
      amount: 120, 
      date: "2025-03-20", 
      status: "pending", 
      description: "Monthly Membership Fee" 
    },
    { 
      id: "3", 
      memberId: "3", 
      amount: 250, 
      date: "2025-03-01", 
      status: "paid", 
      description: "Annual Contribution" 
    },
    { 
      id: "4", 
      memberId: "4", 
      amount: 120, 
      date: "2025-02-15", 
      status: "overdue", 
      description: "Monthly Membership Fee" 
    }
  ];

  // Filter payments by selected members if any
  const filteredPayments = selectedMembers.length > 0 
    ? payments.filter(payment => selectedMembers.includes(payment.memberId))
    : payments;

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = filteredPayments
    .filter(payment => payment.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const paidPercentage = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmount.toFixed(2)} €</div>
            <p className="text-xs text-muted-foreground">For selected period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidAmount.toFixed(2)} €</div>
            <Progress value={paidPercentage} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground">{paidPercentage.toFixed(1)}% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalAmount - paidAmount).toFixed(2)} €</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            Track all payments from members
          </CardDescription>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1">
              <Label htmlFor="date-filter">Date</Label>
              <Input
                id="date-filter"
                type="month"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="status-filter">Status</Label>
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
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Member ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell>{payment.memberId}</TableCell>
                    <TableCell>{payment.amount.toFixed(2)} €</TableCell>
                    <TableCell>
                      <Badge variant={payment.status}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    No payments found for the selected filters
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
