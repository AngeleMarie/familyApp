import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDate: { type: String },
  taskTime: { type: String },
});

export default mongoose.model('Task', taskSchema);
