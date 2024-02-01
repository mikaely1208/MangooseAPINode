import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
require(';/bdd.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const authController = require('./controllers/authController.js');


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

// Initialisation de Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Configuration de Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Configuration du middleware pour parser les requêtes JSON
app.use(express.json());

// Configuration des routes de l'API avec le contrôleur
app.use('/api/auth', authController);

// Configuration de la route par défaut
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Configuration des routes de l'API avec les routes
app.use('/api/auth', authRoutes);

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});