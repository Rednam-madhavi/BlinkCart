import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: String,
        price: { type: Number, required: true },
        category: [String],
        stock: { type: Number, default: 0 },
        brand: String,
        features: [Object],
        images: [
            {
                url: String,
                publicId: String,
            },
        ],
        seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        views: { type: Number, default: 0 },
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

export const Product = mongoose.model("Product", productSchema);
