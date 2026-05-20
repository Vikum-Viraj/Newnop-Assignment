import React, { useEffect, useState } from 'react';
import { issueAPI } from '../../api/Issue-api.ts';

interface Issue {
  _id: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  severity: 'Minor' | 'Moderate' | 'Major' | 'Critical';
  createdAt: string;
  updatedAt: string;
}

interface ViewIssueProps {
  issueId: string | null;
  onClose: () => void;
}

const ViewIssue: React.FC<ViewIssueProps> = ({ issueId, onClose }) => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (issueId) {
      fetchIssue();
    }
  }, [issueId]);

  const fetchIssue = async () => {
    setLoading(true);
    setError('');
    const result = await issueAPI.getIssueById(issueId!);
    
    if (result.success && result.data) {
      setIssue(result.data);
    } else {
      setError(result.message || 'Failed to fetch issue details');
    }
    setLoading(false);
  };

  if (!issueId) return null;

  const getStatusBadge = (status: string) => {
    const styles = {
      'Open': 'bg-blue-100 text-blue-800 border-blue-300',
      'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Resolved': 'bg-green-100 text-green-800 border-green-300',
      'Closed': 'bg-gray-100 text-gray-800 border-gray-300'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      'Low': 'bg-slate-100 text-slate-800 border-slate-300',
      'Medium': 'bg-blue-100 text-blue-800 border-blue-300',
      'High': 'bg-orange-100 text-orange-800 border-orange-300',
      'Critical': 'bg-red-100 text-red-800 border-red-300'
    };
    return styles[priority as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getSeverityBadge = (severity: string) => {
    const styles = {
      'Minor': 'bg-green-100 text-green-800 border-green-300',
      'Moderate': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Major': 'bg-orange-100 text-orange-800 border-orange-300',
      'Critical': 'bg-red-100 text-red-800 border-red-300'
    };
    return styles[severity as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Issue Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
              {error}
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && issue && (
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{issue.title}</h3>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(issue.status)}`}>
                  {issue.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityBadge(issue.priority)}`}>
                  {issue.priority} Priority
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityBadge(issue.severity)}`}>
                  {issue.severity}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
              <p className="text-gray-600 leading-relaxed">{issue.description}</p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">Created</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(issue.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Updated</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(issue.updatedAt)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewIssue;