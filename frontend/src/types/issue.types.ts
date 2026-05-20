// Shared types for Issue management
export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  severity: 'Minor' | 'Moderate' | 'Major' | 'Critical';
  createdAt: string;
  updatedAt: string;
}

export interface StatusCounts {
  Open: number;
  'In Progress': number;
  Resolved: number;
  Closed: number;
  Total: number;
}
