import { Request, Response } from 'express';
import User, { IUser } from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Création d'un nouvel utilisateur
    const newUser: IUser = new User({ username, password });
    await newUser.save();

    // Génération du token JWT
    const token = jwt.sign({ userId: newUser._id }, 'secretKey');

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Vérification si l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Vérification du mot de passe
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Génération du token JWT
    const token = jwt.sign({ userId: user._id }, 'secretKey');

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};