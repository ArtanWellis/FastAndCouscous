const express = require('express');
const axios = require('axios');
const app = express();
const port = 3010;

const Order = require('../Application/app/models/Order');

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Configuration de l'URL de l'API externe
const API_BASE_URL = 'http://localhost:3002';

// Endpoint du BFF pour obtenir les préparations avec "state" fixé à "preparationStarted"
app.get('/kitchen/preparations', async (req, res) => {

    const state = 'preparationStarted'; // Paramètre "state" fixé
    try {
        // Requête vers l'API externe
        const response = await axios.get(`${API_BASE_URL}/preparations`, {
            params: { state },
        });
        const orders = response.data.flatMap(preparation => {
            const order = new Order(preparation._id,preparation.PayedHour);
            order.id = preparation.id,
            order.PayedHours = preparation.PayedHours,
            order.preparedItems = order.setItems(preparation.preparedItems)
            return order;
        });

        console.log('Réponse de lAPI externe:'+orders);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Erreur lors de la requête à lAPI externe:', error.message);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: 'Erreur interne du serveur.' });
        }
    }
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`BFF en cours d'exécution sur http://localhost:${port}`);
});
