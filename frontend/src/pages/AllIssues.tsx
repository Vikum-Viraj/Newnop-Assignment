import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { issueAPI } from '../api/Issue-api.ts';
import ViewIssue from '../components/view/ViewIssue.tsx';

import Pagination from '../components/Pagination';

import SearchFilters from '../components/filter/SearchFilters.tsx';
import type { Issue } from '../types/issue.types';
import { 
  getStatusBadge, 
  getPriorityBadge, 
  getSeverityIcon, 
  formatDate, 
  calculateStatusCounts,
  filterIssues 
} from '../utils/issueHelpers';
import StatusCards from '../components/view/StatusCards.tsx';
import CreateIssue from '../components/form/CreateIssue.tsx';

const AllIssues = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const itemsPerPage = 4;

  useEffect(() => {
    fetchAllIssues();
  }, []);

  // Debounce search term to optimize performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchAllIssues = async () => {
    setLoading(true);
    setError('');
    const result = await issueAPI.getAllIssues();
    
    if (result.success && result.data) {
      setIssues(result.data);
    } else {
      setError(result.message || 'Failed to fetch issues');
    }
    setLoading(false);
  };

  // filter issues based on search and filters
  const filteredIssues = useMemo(() => {
    return filterIssues(issues, debouncedSearchTerm, statusFilter, priorityFilter, severityFilter);
  }, [issues, debouncedSearchTerm, statusFilter, priorityFilter, severityFilter]);

  // Calculate status counts from all issues
  const statusCounts = useMemo(() => calculateStatusCounts(issues), [issues]);

  // Pagination logic - using filtered issues
  const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  //reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, statusFilter, priorityFilter, severityFilter]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setSeverityFilter('All');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">All Issues</h1>
            <p className="text-gray-600 text-lg">Complete overview of all tracked issues</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full hover:from-indigo-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
              title="Create New Issue"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/my-issues')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-lg font-bold rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Issues
            </button>
          </div>
        </div>

        {/* Status Cards */}
        <StatusCards statusCounts={statusCounts} />

        {/* Search and Filter Section */}
        {!loading && !error && (
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            severityFilter={severityFilter}
            setSeverityFilter={setSeverityFilter}
            clearFilters={clearFilters}
            filteredCount={filteredIssues.length}
            totalCount={issues.length}
          />
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
              <div className="absolute top-0 left-0 animate-ping rounded-full h-16 w-16 border-b-4 border-indigo-400 opacity-75"></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8 shadow-md">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-red-800 font-semibold">Error Loading Issues</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Issues List */}
        {!loading && !error && (
          <>
            {filteredIssues.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-16 text-center">
                <svg className="mx-auto w-20 h-20 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Issues Found</h3>
                <p className="text-gray-500">
                  {issues.length === 0 
                    ? 'There are no issues to display at this time.' 
                    : 'No issues match your current filters. Try adjusting your search or filters.'}
                </p>
                {issues.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {filteredIssues.length === issues.length 
                      ? `All Issues (${issues.length})`
                      : `Filtered Issues (${filteredIssues.length}/${issues.length})`}
                  </h2>
                </div>

                {currentIssues.map((issue) => (
                  <div
                    key={issue._id}
                    className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      {/* Left Section */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-2xl mt-1">{getSeverityIcon(issue.severity)}</span>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {issue.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                              {issue.description}
                            </p>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-3">
                          <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border-2 ${getStatusBadge(issue.status)}`}>
                            <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                            {issue.status}
                          </span>
                          
                          <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border-2 ${getPriorityBadge(issue.priority)}`}>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                            </svg>
                            {issue.priority} Priority
                          </span>

                          <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 border-2 border-gray-200">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            {issue.severity} Severity
                          </span>
                        </div>
                      </div>

                      {/* Right Section */}
                      <div className="flex flex-col items-start lg:items-end gap-3 lg:min-w-[200px]">
                        <div className="text-sm text-gray-500 flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(issue.createdAt)}
                        </div>

                        <button 
                          onClick={() => setSelectedIssueId(issue._id)}
                          className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-indigo-800 shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          View Details
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {!loading && !error && filteredIssues.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* View Issue Modal */}
        {selectedIssueId && (
          <ViewIssue 
            issueId={selectedIssueId} 
            onClose={() => setSelectedIssueId(null)} 
          />
        )}

        {/* Create Issue Modal */}
        {showCreateModal && (
          <CreateIssue
            onClose={() => setShowCreateModal(false)}
            onCreate={fetchAllIssues}
          />
        )}
      </div>
    </div>
  );
};

export default AllIssues;
