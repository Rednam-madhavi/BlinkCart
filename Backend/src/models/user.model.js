import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            requires: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            requires: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            requires: [true, 'Password is Required'],
        },
    },
    { timestamps: true }
)

export const User = mongoose.model('User', userSchema);
