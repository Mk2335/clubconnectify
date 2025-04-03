
import { Member } from "@/types/member";

export function downloadCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    console.error("No data to export");
    return;
  }

  // Get headers from the first object's keys
  const headers = Object.keys(data[0]);
  
  // Create CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(item => 
      headers.map(header => {
        let value = item[header];
        
        // Handle special cases
        if (value === null || value === undefined) {
          return '';
        }
        
        // If the value is an object, convert to JSON string
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        
        // Escape quotes and wrap in quotes if the value contains commas, quotes, or newlines
        const cellValue = String(value);
        if (cellValue.includes(',') || cellValue.includes('"') || cellValue.includes('\n')) {
          return `"${cellValue.replace(/"/g, '""')}"`;
        }
        return cellValue;
      }).join(',')
    )
  ].join('\n');
  
  // Create a Blob with the CSV data
  const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  
  // Append to the body, click it, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportMembers(members: Member[], selectedOnly: boolean = false, selectedIds: string[] = []) {
  const dataToExport = selectedOnly && selectedIds.length > 0
    ? members.filter(member => selectedIds.includes(member.id))
    : members;

  if (dataToExport.length === 0) {
    console.error("No members to export");
    return;
  }
  
  // Format the data for CSV export
  const formattedData = dataToExport.map(member => {
    return {
      id: member.id,
      name: member.name,
      email: member.email,
      status: member.status,
      type: member.type,
      role: member.role || '',
      joinDate: member.joinDate,
      paymentMethod: member.paymentMethod || '',
      companyName: member.companyDetails?.companyName || '',
      registrationNumber: member.companyDetails?.registrationNumber || '',
      contactPerson: member.companyDetails?.contactPerson || ''
    };
  });
  
  // Create a timestamp for the filename
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
  
  // Download the CSV
  downloadCSV(formattedData, `members_export_${timestamp}.csv`);
}
