import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExecutiveBodiesTableProps {
  section: "management" | "supervisory";
  title: string;
}

export const ExecutiveBodiesTable = ({ section, title }: ExecutiveBodiesTableProps) => {
  return (
    <>
      <TableRow className="bg-sky-50">
        <TableCell colSpan={7} className="font-medium">{title}</TableCell>
      </TableRow>
      {[...Array(3)].map((_, i) => (
        <TableRow key={`${section}-${i}`}>
          <TableCell><Input /></TableCell>
          <TableCell><Input /></TableCell>
          <TableCell><Input /></TableCell>
          <TableCell><Input type="date" /></TableCell>
          <TableCell><Input /></TableCell>
          <TableCell><Input type="date" /></TableCell>
          <TableCell><Input type="date" /></TableCell>
        </TableRow>
      ))}
    </>
  );
};