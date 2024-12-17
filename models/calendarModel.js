import mongoose from "mongoose";

const calendarEventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
 eventTime: { type: String }
  
});

export default mongoose.model('CalendarEvent', calendarEventSchema);
