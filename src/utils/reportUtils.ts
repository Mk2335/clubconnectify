
import { Member } from '@/types/member';
import { jsPDF } from 'jspdf';
import { downloadCSV } from './exportUtils';
import { CommunicationRecord } from '@/types/communication';

interface ReportOptions {
  title: string;
  description?: string;
  includeDate?: boolean;
  paperSize?: 'a4' | 'letter' | 'legal';
}

const defaultOptions: ReportOptions = {
  title: 'Report',
  description: '',
  includeDate: true,
  paperSize: 'a4'
};

/**
 * Formats a date for display in reports
 */
export function formatReportDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Exports data to CSV format
 */
export function exportToCSV(data: any[], filename: string): void {
  downloadCSV(data, filename);
}

/**
 * Generates and downloads a PDF report from tabular data
 * This is a simplified implementation - a real-world implementation would use libraries like jsPDF
 */
export function generatePDFReport<T>(
  data: T[],
  columns: Record<keyof T | string, string>,
  filename: string,
  options: Partial<ReportOptions> = {}
): void {
  const mergedOptions = { ...defaultOptions, ...options };
  
  // In a real implementation, this would use jsPDF or similar library
  // This is just a placeholder to show structure
  alert('PDF export functionality will be available in the next update');
  
  // Example implementation would look like:
  /*
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: mergedOptions.paperSize
  });
  
  // Add title
  doc.setFontSize(18);
  doc.text(mergedOptions.title, 20, 20);
  
  // Add date if requested
  if (mergedOptions.includeDate) {
    doc.setFontSize(12);
    doc.text(formatReportDate(new Date()), 20, 30);
  }
  
  // Add description if provided
  if (mergedOptions.description) {
    doc.setFontSize(12);
    doc.text(mergedOptions.description, 20, mergedOptions.includeDate ? 40 : 30);
  }
  
  // Generate table
  const headers = Object.values(columns);
  const rows = data.map(item => {
    return Object.keys(columns).map(key => {
      const value = item[key as keyof T];
      return value !== undefined && value !== null ? String(value) : '';
    });
  });
  
  // Draw table
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: mergedOptions.description ? 50 : 40,
  });
  
  // Save PDF
  doc.save(filename);
  */
}

/**
 * Generate member statistics report data
 */
export function generateMemberStatistics(members: Member[]): Record<string, any> {
  // Count members by status
  const statusCounts = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Count members by type
  const typeCounts = members.reduce((acc, member) => {
    acc[member.type] = (acc[member.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Get join date distribution by month
  const joinMonths = members.reduce((acc, member) => {
    const date = new Date(member.joinDate);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort join months chronologically
  const sortedJoinMonths = Object.entries(joinMonths)
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
  
  return {
    totalMembers: members.length,
    byStatus: statusCounts,
    byType: typeCounts,
    joinDateDistribution: sortedJoinMonths
  };
}

/**
 * Generate communication activity report data
 */
export function generateCommunicationActivity(communications: CommunicationRecord[]): Record<string, any> {
  // Count by type
  const typeCounts = communications.reduce((acc, comm) => {
    acc[comm.type] = (acc[comm.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Count by status
  const statusCounts = communications.reduce((acc, comm) => {
    acc[comm.status] = (acc[comm.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Get time distribution
  const timeDistribution = communications.reduce((acc, comm) => {
    const date = new Date(comm.sentAt);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort chronologically
  const sortedTimeDistribution = Object.entries(timeDistribution)
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
  
  return {
    totalCommunications: communications.length,
    byType: typeCounts,
    byStatus: statusCounts,
    timeDistribution: sortedTimeDistribution
  };
}

/**
 * Share report via browser's Web Share API or fallback to clipboard
 */
export async function shareReport(title: string, text: string, url?: string): Promise<void> {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url: url || window.location.href
      });
    } catch (err) {
      console.error('Share failed:', err);
    }
  } else {
    // Fallback to clipboard
    try {
      const shareText = `${title}\n\n${text}\n\n${url || window.location.href}`;
      await navigator.clipboard.writeText(shareText);
      return Promise.resolve();
    } catch (err) {
      console.error('Clipboard write failed:', err);
      return Promise.reject(err);
    }
  }
}

/**
 * Print a specific element on the page
 */
export function printElement(elementId: string, title: string = 'Print'): void {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID '${elementId}' not found`);
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    console.error('Could not open print window');
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="printable-content">
          ${element.innerHTML}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  // Print after content is loaded
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}
