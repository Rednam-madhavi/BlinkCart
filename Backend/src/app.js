import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Match exactly what your browser shows
  credentials: true, // Allow cookies/sessions
  optionsSuccessStatus: 200 // Legacy browser support
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())


import userRoutes from './routes/user.routes.js';
import cartRoutes from './routes/cart.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);


export { app }

