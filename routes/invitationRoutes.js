import express from 'express';
import { sendInvite, getAllInvites, acceptInvite, rejectInvite, updateInviteStatus } from '../controllers/memberController.js';
import { authenticateUser } from '../middlewares/auth.js';  

const router = express.Router();

router.post('/send', sendInvite); 
router.get('/',  getAllInvites);
router.put('/accept/:id', acceptInvite); 
router.put('/reject/:id', rejectInvite);
router.put('/status/:id', updateInviteStatus); 

export default router;
