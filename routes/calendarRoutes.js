import express from 'express';
import { addEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/calendarController.js';

const router = express.Router();

router.post('/add', addEvent);
router.get('/getAll', getAllEvents);
router.get('/getEvent/:id', getEventById);
router.put('/updateEvent/:id', updateEvent); 
router.delete('/deleteEvent/:id', deleteEvent);

export default router;
