import React from 'react';
import type { StatusCounts } from '../../types/issue.types';


interface StatusCardsProps {
  statusCounts: StatusCounts;
}

const StatusCards: React.FC<StatusCardsProps> = ({ statusCounts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {/* Total Issues */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm font-medium mb-1">Total Issues</p>
            <p className="text-4xl font-bold">{statusCounts.Total}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full p-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Open Issues */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-6 transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-600 text-sm font-semibold mb-1">Open</p>
            <p className="text-4xl font-bold text-blue-700">{statusCounts.Open}</p>
          </div>
          <div className="bg-blue-100 rounded-full p-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* In Progress Issues */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-yellow-200 p-6 transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-600 text-sm font-semibold mb-1">In Progress</p>
            <p className="text-4xl font-bold text-yellow-700">{statusCounts['In Progress']}</p>
          </div>
          <div className="bg-yellow-100 rounded-full p-3">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Resolved Issues */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-6 transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 text-sm font-semibold mb-1">Resolved</p>
            <p className="text-4xl font-bold text-green-700">{statusCounts.Resolved}</p>
          </div>
          <div className="bg-green-100 rounded-full p-3">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Closed Issues */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Closed</p>
            <p className="text-4xl font-bold text-gray-700">{statusCounts.Closed}</p>
          </div>
          <div className="bg-gray-100 rounded-full p-3">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCards;
