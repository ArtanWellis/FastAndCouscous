const express = require('express');
const axios = require('axios');
const app = express();
const port = 3010;
const cors = require('cors');


const Order = require('../Application/app/models/Order');
let orders = [];
let validatedOrders = [];
// Middleware pour gérer les requêtes JSON
app.use(express.json());

app.use(cors());


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
        const filteredPreparations = response.data.filter(preparation => 
            !validatedOrders.find(order => order.id === preparation._id)&&
            !orders.find(order => order.id === preparation._id)
        );

        const localOrders = filteredPreparations.map(preparation => {
            const currentHour = new Date().toISOString(); // Obtenir l'heure actuelle
            const order = new Order(preparation._id, preparation.preparedItems, currentHour);
            order.setItems(preparation.preparedItems);
            return order;
        });


        for(const order of localOrders){
            for(const item of order.items){
                try {
                    const response = await axios.get(`${API_BASE_URL}/preparedItems/${item.id}/recipe`);
                    item.category = response.data.post;
                    item.type = response.data.cookingSteps[0];
                    item.ingredients = response.data.cookingSteps.slice(1); // Récupérer tous les ingrédients à partir du deuxième élément
                } catch (error) {
                    console.error(`Erreur lors de la récupération des ingrédients pour l'item ${item.id}:`, error.message);
                }
            }
            orders.push(order);
        }


        res.status(200).json(orders);
    } catch (error) {
        console.error('Erreur lors de la requête à lAPI externe:', error.message);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: 'Erreur interne du serveur.' });
        }
    }
});

app.get('/kitchen/validation/:id', async (req, res) => {
    const id = req.params.id;
    console.log('commande validée :', id);
    const orderIndex = orders.findIndex(order => order.id === id);

    if (orderIndex !== -1) {
        try {

            validatedOrders.push(orders[orderIndex]);

            orders = orders.filter(order => order.id !== id);

            console.log('Commande validée:', validatedOrders);

            res.status(200).json({ message: 'Commande validée et supprimée de la liste.' });
        } catch (error) {
            console.error('Erreur lors de la validation de la commande:', error.message);
            if (error.response) {
                res.status(error.response.status).json({ error: error.response.data });
            } else {
                res.status(500).json({ error: 'Erreur interne du serveur.' });
            }
        }
    } else {
        res.status(404).json({ error: 'Commande non trouvée.' });
    }
});

app.get('/kitchen/retrieve/:id', async (req, res) => {
    const id = req.params.id;
    console.log(' retrouver id:', id);
    const orderIndex = validatedOrders.findIndex(order => order.id === id);
    if (orderIndex !== -1) {
        const order = validatedOrders[orderIndex];
        orders.unshift(order); // Ajouter la commande au début de la liste
        validatedOrders = validatedOrders.filter(order => order.id !== id);
        res.status(200).json({ message: 'Commande récupérée et ajoutée au début de la liste.' });
    } else {
        res.status(404).json({ error: 'Commande non trouvée.' });
    }
});



// Démarrage du serveur
app.listen(port, () => {
    console.log(`BFF en cours d'exécution sur http://localhost:${port}`);
});
