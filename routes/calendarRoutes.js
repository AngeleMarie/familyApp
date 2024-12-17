import express from 'express';
import { addEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/calendarController.js';
import { authenticateUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/add', addEvent);
router.get('/getAll', authenticateUser, getAllEvents);
router.get('/getEvent/:id', authenticateUser, getEventById);
router.put('/updateEvent/:id', authenticateUser, updateEvent);
router.delete('/deleteEvent/:id', authenticateUser, deleteEvent);

export default router;
