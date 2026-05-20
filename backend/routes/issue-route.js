import express from "express";
import { createIssue, updateIssue, getAllIssues, getIssueById, getUserIssues, deleteIssue } from "../controller/Issue-controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes - require authentication
router.get("/", authMiddleware, getAllIssues);
router.get("/user/my-issues", authMiddleware, getUserIssues);
router.get("/:id", authMiddleware, getIssueById);
router.post("/create", authMiddleware, createIssue);
router.put("/update/:id", authMiddleware, updateIssue);
router.delete("/delete/:id", authMiddleware, deleteIssue);

export default router;
