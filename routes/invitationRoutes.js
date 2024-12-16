import express from'express';

import { inviteMember, getAllMembers, updateStatus } from '../controllers/memberController.js';

const router = express.Router();

router.post('/invite', inviteMember); 
router.get('/', getAllMembers); 
router.put('/:id/status', updateStatus); 

export default router

