import express from "express";
import { addTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../controllers/taskController.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add",  addTask);
router.get("/getAll", getAllTasks);
router.get("/getTask/:id", getTaskById);
router.put("/updateTask/:id",  updateTask);
router.delete("/deleteTask/:id", deleteTask);

export default router;
