import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MemberStatisticsTableProps {
  formData: {
    memberCount: string;
    accessionsCount: string;
    cancellationsCount: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const MemberStatisticsTable = ({
  formData,
  onInputChange,
}: MemberStatisticsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3">Number of members</TableHead>
          <TableHead className="w-1/3">Number of accessions</TableHead>
          <TableHead>Number of cancellations & exclusions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Input
              type="number"
              value={formData.memberCount}
              onChange={(e) => onInputChange('memberCount', e.target.value)}
            />
          </TableCell>
          <TableCell>
            <Input
              type="number"
              value={formData.accessionsCount}
              onChange={(e) => onInputChange('accessionsCount', e.target.value)}
            />
          </TableCell>
          <TableCell>
            <Input
              type="number"
              value={formData.cancellationsCount}
              onChange={(e) => onInputChange('cancellationsCount', e.target.value)}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};