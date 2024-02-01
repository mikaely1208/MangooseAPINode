var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Vérification si l'utilisateur existe déjà
        const existingUser = yield User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Création d'un nouvel utilisateur
        const newUser = new User({ username, password });
        yield newUser.save();
        // Génération du token JWT
        const token = jwt.sign({ userId: newUser._id }, 'secretKey');
        res.status(201).json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Vérification si l'utilisateur existe
        const user = yield User.findOne({ username });
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
