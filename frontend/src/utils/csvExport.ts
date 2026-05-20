import type { Issue } from '../types/issue.types';
import { formatDate } from './issueHelpers';

// Export issues to CSV file
export const exportIssuesToCSV = (issues: Issue[], fileName: string = 'issues-export'): void => {
  if (issues.length === 0) {
    throw new Error('No issues to export');
  }

  // Define CSV headers (without ID)
  const headers = ['Title', 'Description', 'Status', 'Priority', 'Severity', 'Created Date'];

  // Convert issues to CSV rows with proper escaping
  const rows = issues.map(issue => [
    `"${issue.title.replace(/"/g, '""')}"`, // Escape quotes in title
    `"${issue.description.replace(/"/g, '""')}"`, // Escape quotes in description
    issue.status,
    issue.priority,
    issue.severity,
    `"${formatDate(issue.createdAt)}"` // Wrap date in quotes to prevent splitting
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
