import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favoriteCryptos, setFavoriteCryptos] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const { data } = await response.json();

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
       
        const favoriteData = data.filter(crypto => favorites.some(fav => fav.id === crypto.id));

        setFavoriteCryptos(favoriteData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFavorites();
  }, []);

  if (favoriteCryptos.length === 0) {
    return <div>No hay crytops favoritas todavía</div>;
  }

  return (
    <div >
      <h2 className="favorites-h2">Favorite Cryptocurrencies</h2>
      <ul className="crypto-grid"> 
        {favoriteCryptos.map(crypto => (
          <li key={crypto.id}>
            <div className="crypto-item">
              <h3>
                <Link to={`/coin/${crypto.id}`}>
                  {crypto.name} ({crypto.symbol})
                </Link>
              </h3>
              <p>Rank: {crypto.rank}</p>
              <p>Price USD: ${parseFloat(crypto.priceUsd).toFixed(2)}</p>
              <p>Market Cap USD: ${parseFloat(crypto.marketCapUsd).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;