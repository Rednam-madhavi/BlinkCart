import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import connectDB from "./db/index.js";
import { app } from '../src/app.js';

const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.on('error', (error) => {
            console.log('Error:', error);
            throw error;
        });
        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
        });
    })
    .catch((error) => {
        console.log('MongoDB Connection Failed!!', error);
    });
