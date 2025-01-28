import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";

interface GeneralSectionProps {
  form: UseFormReturn<any>;
}

export const GeneralSection = ({ form }: GeneralSectionProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">I. General Section</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Information for the last two financial years:</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Description</TableHead>
                <TableHead>Previous Year</TableHead>
                <TableHead>Current Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Financial year ending on:</TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="financialYear1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="financialYear2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Balance sheet total in EURO:</TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="balanceSheet1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="balanceSheet2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Revenue in EURO:</TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="revenue1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="revenue2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-base">The current statutes do not provide for an obligation to make additional contributions:</Label>
            <RadioGroup className="mt-2 flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="additional-yes" />
                <Label htmlFor="additional-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="additional-no" />
                <Label htmlFor="additional-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-base">The cooperative has not accepted loans (§ 21b GenG) from its members or offered asset investments exclusively to its members:</Label>
            <RadioGroup className="mt-2 flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="loans-yes" />
                <Label htmlFor="loans-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="loans-no" />
                <Label htmlFor="loans-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </Card>
  );
};