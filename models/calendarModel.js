import mongoose from "mongoose";

const calendarEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String },
  createdBy: { type: String, required: true },
});

export default mongoose.model('CalendarEvent', calendarEventSchema);
