import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductMatching = ({ shoppingList }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.post('http://localhost:5001/api/products', { shoppingList });
                setMatches(response.data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };
        fetchMatches();
    }, [shoppingList]);

    return (
        <div>
            <h2>Product Matches</h2>
            <ul>
                {matches.map((match) => (
                    <li key={match.productId}>{match.name} - ${match.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductMatching;
