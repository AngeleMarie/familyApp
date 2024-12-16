import express from 'express';
import { addItem, getAllItems, getItemById, updateItem, deleteItem } from '../controllers/shoppingController.js';
import { authenticateUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/add', authenticateUser, addItem);
router.get('/getAll', authenticateUser, getAllItems);
router.get('/getItem/:id', authenticateUser, getItemById);
router.put('/update/:id', authenticateUser, updateItem);
router.delete('/delete/:id', authenticateUser, deleteItem);

export default router;
