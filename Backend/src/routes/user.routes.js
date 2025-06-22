import { Router } from 'express'
import { registerUser, loginUser, logoutUser } from '../controllers/user.controller.js';

const router = Router()

router.route('/signup').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)

// POST /api/cart
router.post("/cart", async (req, res) => {
    const cartItem = new Cart(req.body);
    await cartItem.save();
    res.status(201).json(cartItem);
});

// DELETE /api/wishlist/:id
router.delete("/wishlist/:id", async (req, res) => {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// GET /api/wishlist
router.get("/wishlist", async (req, res) => {
    const items = await Wishlist.find();
    res.json(items);
});

// GET /api/products
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find(); // Your Product model
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});



export default router;
