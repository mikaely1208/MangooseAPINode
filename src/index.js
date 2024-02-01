import express from 'express';
import mongoose from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
//import run from './bdd.js'; 
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI || '';
//run().catch(console.dir);
// Configuration de la connexion à la base de données MongoDB avec Mongoose
mongoose.connect(uri);
// ca marche pas ca
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000 // Ajoutez cette option si nécessaire
// });
// Configuration de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
        },
    },
    apis: ['src/routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
// Configuration du middleware pour parser les requêtes JSON
app.use(express.json());
// Configuration des routes de l'API
app.use('/api/auth', authRoutes);
// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
