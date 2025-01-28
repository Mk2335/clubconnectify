import { FormField } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";

interface FinancialStatementsTableProps {
  form: UseFormReturn<any>;
}

const FinancialStatementsTable = ({ form }: FinancialStatementsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Annual Financial Statements</TableHead>
          <TableHead>Set up on</TableHead>
          <TableHead>Established on</TableHead>
          <TableHead>Protocol available</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[0, 1, 2, 3].map((index) => (
          <TableRow key={index}>
            <TableCell>
              <FormField
                control={form.control}
                name={`statements.${index}.statement`}
                render={({ field }) => (
                  <Input {...field} placeholder="Statement name" />
                )}
              />
            </TableCell>
            <TableCell>
              <FormField
                control={form.control}
                name={`statements.${index}.setupDate`}
                render={({ field }) => (
                  <Input {...field} type="date" />
                )}
              />
            </TableCell>
            <TableCell>
              <FormField
                control={form.control}
                name={`statements.${index}.establishedDate`}
                render={({ field }) => (
                  <Input {...field} type="date" />
                )}
              />
            </TableCell>
            <TableCell>
              <FormField
                control={form.control}
                name={`statements.${index}.hasProtocol`}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`protocol-yes-${index}`} />
                      <Label htmlFor={`protocol-yes-${index}`}>Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`protocol-no-${index}`} />
                      <Label htmlFor={`protocol-no-${index}`}>No</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FinancialStatementsTable;