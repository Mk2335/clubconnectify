import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const FinancialInstrumentsSection = ({ form }: { form: any }) => {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">
        VI. Financial Instruments and Contingencies
      </h2>

      <FormField
        control={form.control}
        name="cryptoCurrencyTrading"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              No cryptocurrency trading was conducted by the cooperative during the audit period.
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="crypto-yes" />
                  <Label htmlFor="crypto-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="crypto-no" />
                  <Label htmlFor="crypto-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="derivativeInstruments"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              No derivative financial instruments (e.g., foreign currency, interest rate, securities and index-based option transactions and forward contracts, commodity forward transactions, futures, swaps, forward rate agreements and forward deposits) are held by the cooperative, including as part of structured financial instruments.
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="derivatives-yes" />
                  <Label htmlFor="derivatives-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="derivatives-no" />
                  <Label htmlFor="derivatives-no">No, namely</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead className="w-[200px]">Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[150px]">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(8)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input
                  {...form.register(`derivatives.${index}.number`)}
                  placeholder={`${index + 1}`}
                />
              </TableCell>
              <TableCell>
                <Input
                  {...form.register(`derivatives.${index}.type`)}
                  placeholder="Type"
                />
              </TableCell>
              <TableCell>
                <Input
                  {...form.register(`derivatives.${index}.description`)}
                  placeholder="Description"
                />
              </TableCell>
              <TableCell>
                <Input
                  {...form.register(`derivatives.${index}.value`)}
                  placeholder="Value"
                  type="number"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <FormField
        control={form.control}
        name="dayTrading"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              No day trading was conducted by the cooperative during the audit period, only long-term asset management of the promotional purpose was pursued.
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="daytrading-yes" />
                  <Label htmlFor="daytrading-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="daytrading-no" />
                  <Label htmlFor="daytrading-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};