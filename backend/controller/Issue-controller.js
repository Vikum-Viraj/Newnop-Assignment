import Issue from "../models/Issue.js";
import User from "../models/User.js";

// Create a new issue
export const createIssue = async (req, res) => {
    try {
        const { title, description, status, priority, severity } = req.body;
        const userId = req.user.id; // From authMiddleware

        // Validation
        if (!title || !description) {
            return res.status(400).json({ 
                success: false, 
                message: "Title and description are required" 
            });
        }

        const newIssue = new Issue({
            title,
            description,
            status: status || 'Open',
            priority: priority || 'Medium',
            severity: severity || 'Moderate',
            user: userId
        });

        await newIssue.save();

        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: newIssue
        });
    } catch (error) {
        console.error("Error creating issue:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create issue",
            error: error.message
        });
    }
};

// Update an existing issue
export const updateIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, priority, severity } = req.body;

        // Check if issue exists
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }

        // Update fields if provided
        if (title) issue.title = title;
        if (description) issue.description = description;
        if (status) issue.status = status;
        if (priority) issue.priority = priority;
        if (severity) issue.severity = severity;

        await issue.save();

        res.status(200).json({
            success: true,
            message: "Issue updated successfully",
            data: issue
        });
    } catch (error) {
        console.error("Error updating issue:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update issue",
            error: error.message
        });
    }
};

// Get all issues
export const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Issues retrieved successfully",
            count: issues.length,
            data: issues
        });
    } catch (error) {
        console.error("Error fetching issues:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch issues",
            error: error.message
        });
    }
};

// Get single issue by ID
export const getIssueById = async (req, res) => {
    try {
        const { id } = req.params;

        const issue = await Issue.findById(id);

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Issue retrieved successfully",
            data: issue
        });
    } catch (error) {
        console.error("Error fetching issue:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch issue",
            error: error.message
        });
    }
};

// Get all issues for the logged-in user
export const getUserIssues = async (req, res) => {
    try {
        const userId = req.user.id;

        const issues = await Issue.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "User issues retrieved successfully",
            count: issues.length,
            data: issues
        });
    } catch (error) {
        console.error("Error fetching user issues:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user issues",
            error: error.message
        });
    }
};

// Delete an issue
export const deleteIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if issue exists
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }

        // Check if user owns the issue
        if (issue.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this issue"
            });
        }

        await Issue.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Issue deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting issue:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete issue",
            error: error.message
        });
    }
};
