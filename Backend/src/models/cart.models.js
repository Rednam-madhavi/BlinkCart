import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: String,
    items: [
        {
            productId: String,
            name: String,
            price: Number,
            image: String,
            quantity: { type: Number, default: 1 }
        }
    ]
});

export const Cart = mongoose.model("Cart", cartSchema);
