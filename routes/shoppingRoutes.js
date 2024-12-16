import express from 'express';
import { addItem, getAllItems, getItemById, updateItem, deleteItem } from '../controllers/shoppingController.js';

const router = express.Router();

router.post('/add', addItem);
router.get('/getAll', getAllItems);
router.get('/getItem/:id', getItemById);
router.put('/update/:id', updateItem); 
router.delete('/delete/:id', deleteItem);

export default router;
