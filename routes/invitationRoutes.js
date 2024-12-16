import express from 'express';
import { sendInvite, getAllInvites, acceptInvite, rejectInvite, updateInviteStatus } from '../controllers/memberController.js';
import { authenticateUser } from '../middlewares/auth.js';  

const router = express.Router();

router.post('/send', authenticateUser, sendInvite); 
router.get('/', authenticateUser, getAllInvites);
router.put('/accept/:id', authenticateUser, acceptInvite); 
router.put('/reject/:id', authenticateUser, rejectInvite);
router.put('/status/:id', authenticateUser, updateInviteStatus); 

export default router;
