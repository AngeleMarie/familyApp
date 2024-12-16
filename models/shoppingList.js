import mongoose from "mongoose";


const shoppingItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  purchased: { type: Boolean, default: false },
  category: { type: String, required: true },
  
});

export default mongoose.model('ShoppingItem', shoppingItemSchema);
