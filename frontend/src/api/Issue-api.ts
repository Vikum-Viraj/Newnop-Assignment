import axiosClient from './axiosClient'
import { AxiosError } from 'axios'

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

interface IssueCreateData {
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  severity: 'Minor' | 'Moderate' | 'Major' | 'Critical';
}

interface IssueUpdateData {
  title?: string;
  description?: string;
  status?: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  severity?: 'Minor' | 'Moderate' | 'Major' | 'Critical';
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const issueAPI = {
  // Get all issues
  getAllIssues: async (): Promise<ApiResponse<Issue[]>> => {
    try {
      const response = await axiosClient.get('/issues')
      return { success: true, data: response.data.data }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to fetch issues'
      }
    }
  },

  // Get single issue by ID
  getIssueById: async (id: string): Promise<ApiResponse<Issue>> => {
    try {
      const response = await axiosClient.get(`/issues/${id}`)
      return { success: true, data: response.data.data }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to fetch issue'
      }
    }
  },

  //create new issue
  createIssue: async (issueData: IssueCreateData): Promise<ApiResponse<Issue>> => {
    try {
      const response = await axiosClient.post('/issues/create', issueData)
      return { success: true, data: response.data.data }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to create issue'
      }
    }
  },

  // Update issue
  updateIssue: async (id: string, issueData: IssueUpdateData): Promise<ApiResponse<Issue>> => {
    try {
      const response = await axiosClient.put(`/issues/update/${id}`, issueData)
      return { success: true, data: response.data.data }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to update issue'
      }
    }
  },

  // Get current user's issues
  getUserIssues: async (): Promise<ApiResponse<Issue[]>> => {
    try {
      const response = await axiosClient.get('/issues/user/my-issues')
      return { success: true, data: response.data.data }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to fetch user issues'
      }
    }
  },

  // Delete issue
  deleteIssue: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosClient.delete(`/issues/delete/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to delete issue'
      }
    }
  }
}
