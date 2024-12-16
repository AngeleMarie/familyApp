import express from "express";
import { addTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../controllers/taskController.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", authenticateUser, addTask);
router.get("/getAll", authenticateUser, getAllTasks);
router.get("/getTask/:id", authenticateUser, getTaskById);
router.put("/updateTask/:id", authenticateUser, updateTask);
router.delete("/deleteTask/:id", authenticateUser, deleteTask);

export default router;
