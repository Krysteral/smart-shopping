const mongoose = require('mongoose');
const Store = require('../models/Store'); // Import the Store model
require('dotenv').config();

const storeData = [
    {
        "name": "Walmart",
        "city": "Oxford",
        "zip": "38655",
        "inventory": [
            { "product": "Milk", "price": 2.99 },
            { "product": "Bread", "price": 1.25 },
            { "product": "Eggs", "price": 3.50 },
            { "product": "Butter", "price": 4.00 },
            { "product": "Cheese", "price": 2.50 },
            { "product": "Apples", "price": 3.00 },
            { "product": "Chicken", "price": 6.99 },
            { "product": "Rice", "price": 1.99 },
            { "product": "Potatoes", "price": 3.50 },
            { "product": "Onions", "price": 1.25 }
        ]
    },
    {
        "name": "Kroger",
        "city": "Oxford",
        "zip": "38655",
        "inventory": [
            { "product": "Milk", "price": 3.10 },
            { "product": "Bread", "price": 1.20 },
            { "product": "Eggs", "price": 3.40 },
            { "product": "Butter", "price": 3.80 },
            { "product": "Cheese", "price": 2.70 },
            { "product": "Apples", "price": 3.10 },
            { "product": "Chicken", "price": 6.49 },
            { "product": "Rice", "price": 2.10 },
            { "product": "Potatoes", "price": 3.20 },
            { "product": "Onions", "price": 1.15 }
        ]
    },
    {
        "name": "Cash Savers",
        "city": "Oxford",
        "zip": "38655",
        "inventory": [
            { "product": "Milk", "price": 2.85 },
            { "product": "Bread", "price": 1.30 },
            { "product": "Eggs", "price": 3.60 },
            { "product": "Butter", "price": 4.10 },
            { "product": "Cheese", "price": 2.40 },
            { "product": "Apples", "price": 2.90 },
            { "product": "Chicken", "price": 6.79 },
            { "product": "Rice", "price": 2.00 },
            { "product": "Potatoes", "price": 3.30 },
            { "product": "Onions", "price": 1.10 }
        ]
    }
];

const populateStores = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');

        // Clear existing data
        await Store.deleteMany({});
        console.log('Existing stores cleared');

        // Insert new data
        await Store.insertMany(storeData);
        console.log('Stores populated successfully');
    } catch (error) {
        console.error('Error populating stores:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

populateStores();
