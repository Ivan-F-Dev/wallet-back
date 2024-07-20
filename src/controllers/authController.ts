import { Request, Response } from 'express';
import { createUser, findUserByUsername } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export const register = (req: Request, res: Response) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: 'Error hashing password' });

        createUser(username, hashedPassword, (err, results) => {
            if (err) return res.status(500).json({ error: 'Error creating user' });
            res.status(201).json({ message: 'User created successfully' });
        });
    });
};

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    findUserByUsername(username, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error finding user' });

        if (results.length === 0) return res.status(401).json({ error: 'User not found' });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: 'Error comparing passwords' });

            if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        });
    });
};
