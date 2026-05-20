import type { Issue, StatusCounts } from '../types/issue.types';

// Status badge styling
export const getStatusBadge = (status: string): string => {
  const styles = {
    'Open': 'bg-blue-100 text-blue-800 border-blue-300',
    'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Resolved': 'bg-green-100 text-green-800 border-green-300',
    'Closed': 'bg-gray-100 text-gray-800 border-gray-300'
  };
  return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
};

// Priority badge styling
export const getPriorityBadge = (priority: string): string => {
  const styles = {
    'Low': 'bg-slate-50 text-slate-700 border-slate-300',
    'Medium': 'bg-blue-50 text-blue-700 border-blue-300',
    'High': 'bg-orange-50 text-orange-700 border-orange-300',
    'Critical': 'bg-red-50 text-red-700 border-red-300'
  };
  return styles[priority as keyof typeof styles] || 'bg-gray-100 text-gray-800';
};

// Severity icon
export const getSeverityIcon = (severity: string): string => {
  switch (severity) {
    case 'Minor':
      return '';
    case 'Moderate':
      return '';
    case 'Major':
      return '';
    case 'Critical':
      return '';
    default:
      return '';
  }
};

// Format date to readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Calculate status counts from issues array
export const calculateStatusCounts = (issues: Issue[]): StatusCounts => {
  return {
    Open: issues.filter(issue => issue.status === 'Open').length,
    'In Progress': issues.filter(issue => issue.status === 'In Progress').length,
    Resolved: issues.filter(issue => issue.status === 'Resolved').length,
    Closed: issues.filter(issue => issue.status === 'Closed').length,
    Total: issues.length
  };
};

// Filter issues based on search and filters
export const filterIssues = (
  issues: Issue[],
  searchTerm: string,
  statusFilter: string,
  priorityFilter: string,
  severityFilter: string
): Issue[] => {
  return issues.filter(issue => {
    // Search filter
    const matchesSearch = searchTerm === '' ||
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;

    // Priority filter
    const matchesPriority = priorityFilter === 'All' || issue.priority === priorityFilter;

    // Severity filter
    const matchesSeverity = severityFilter === 'All' || issue.severity === severityFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesSeverity;
  });
};
