import mongoose from "mongoose";


const shoppingItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  
});

export default mongoose.model('ShoppingItem', shoppingItemSchema);
