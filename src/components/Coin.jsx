import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Coin = () => {
  const { id } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const { data } = await response.json();
        setCryptoData(data);
        // Check if this crypto is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some(crypto => crypto.id === data.id));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCryptoData();
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(crypto => crypto.id !== cryptoData.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      
      const updatedFavorites = [...favorites, cryptoData];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  if (!cryptoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="centered-container"> 
      <h2>{cryptoData.name} ({cryptoData.symbol})</h2>
      <p>Rank: {cryptoData.rank}</p>
      <p>Price USD: ${parseFloat(cryptoData.priceUsd).toFixed(2)}</p>
      <p>Market Cap USD: ${parseFloat(cryptoData.marketCapUsd).toFixed(2)}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default Coin;