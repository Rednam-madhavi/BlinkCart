import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId: String,
    items: [
        {
            productId: String,
            name: String,
            price: Number,
            image: String
        }
    ]
});

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
