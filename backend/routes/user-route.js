import express from "express";
import { register, login } from "../controller/user-controller.js";

const router = express.Router(); // create a new router instance

router.post("/register", register);
router.post("/login", login);

export default router;
