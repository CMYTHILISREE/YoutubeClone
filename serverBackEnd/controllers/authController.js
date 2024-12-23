import User from '../model/userSchema.js'; // Ensure the model name starts with a capital 'U'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword , profileImage : `https://api.dicebear.com/5.x/initials/svg?seed=${username}` });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.Jwt_secret_key, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username , profileImage : user.profileImage} });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in' });
    }
};