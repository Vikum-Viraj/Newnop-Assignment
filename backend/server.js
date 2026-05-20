import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import  dotenv from 'dotenv' 
import issueRouter from "./routes/issue-route.js";
import userRouter from "./routes/user-route.js";

dotenv.config()

const app = express();

// CORS configuration
app.use(cors({
	origin: [
		"https://newnop-assignment-5rmz.vercel.app",
		"http://localhost:5173"
	],
	credentials: true
}))

app.use(express.json())

// routes
app.use("/api/issues", issueRouter);
app.use("/api/users", userRouter);


mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
.then(() => app.listen(5000))
.then(() => console.log("Server running on port 5000"))
.then(() => console.log("Database is Connected"))
.catch((err) => console.log(err));

