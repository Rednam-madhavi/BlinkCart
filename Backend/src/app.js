import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

import userRouter from '../src/routes/user.routes.js';
import productRouter from '../src/routes/product.routes.js';
import cartRouter from '../src/routes/cart.routes.js';
import wishlistRouter from '../src/routes/wishlist.routes.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/wishlist', wishlistRouter);

export { app }

