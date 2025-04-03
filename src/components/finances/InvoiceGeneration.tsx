
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Printer } from "lucide-react";

interface InvoiceGenerationProps {
  selectedMembers: string[];
}

export function InvoiceGeneration({ selectedMembers }: InvoiceGenerationProps) {
  const [invoiceType, setInvoiceType] = useState<string>("membership");
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState<string>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [includeDetails, setIncludeDetails] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>("");
  
  const { toast } = useToast();
  
  const handleGenerateInvoice = () => {
    if (selectedMembers.length === 0) {
      toast({
        title: "No members selected",
        description: "Please select at least one member to generate invoices for.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Invoices Generated",
      description: `Successfully generated ${selectedMembers.length} invoice(s).`,
    });
  };
  
  const invoiceTemplates = [
    { id: "membership", name: "Membership Fee" },
    { id: "donation", name: "Donation Receipt" },
    { id: "event", name: "Event Registration" },
    { id: "custom", name: "Custom Invoice" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Invoices</CardTitle>
          <CardDescription>
            Create and send invoices for the selected members
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceType">Invoice Template</Label>
              <Select value={invoiceType} onValueChange={setInvoiceType}>
                <SelectTrigger id="invoiceType">
                  <SelectValue placeholder="Select invoice type" />
                </SelectTrigger>
                <SelectContent>
                  {invoiceTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="members">Recipients</Label>
              <Input 
                id="members" 
                value={selectedMembers.length > 0 ? `${selectedMembers.length} member(s) selected` : "No members selected"} 
                disabled 
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeDetails" 
                checked={includeDetails}
                onCheckedChange={(checked) => setIncludeDetails(!!checked)}
              />
              <Label htmlFor="includeDetails" className="cursor-pointer">Include payment details</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional information to include on the invoices..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">
            <Printer className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleGenerateInvoice}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Invoices
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>
            Access and manage previously generated invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto border rounded-md">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50">
                <tr>
                  <th scope="col" className="px-4 py-3">Invoice #</th>
                  <th scope="col" className="px-4 py-3">Date</th>
                  <th scope="col" className="px-4 py-3">Recipient</th>
                  <th scope="col" className="px-4 py-3">Amount</th>
                  <th scope="col" className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">INV-2025-001</td>
                  <td className="px-4 py-3">2025-04-01</td>
                  <td className="px-4 py-3">John Doe</td>
                  <td className="px-4 py-3">120.00 €</td>
                  <td className="px-4 py-3">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">INV-2025-002</td>
                  <td className="px-4 py-3">2025-04-01</td>
                  <td className="px-4 py-3">Jane Smith</td>
                  <td className="px-4 py-3">120.00 €</td>
                  <td className="px-4 py-3">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
