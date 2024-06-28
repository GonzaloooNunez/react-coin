import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const { data } = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCryptos();
  }, []);

  return (
    <div>
      <h2>Top Cryptos</h2>
      <ul className="crypto-grid">
        {cryptos.map(crypto => (
          <li key={crypto.id}>
            <div className="crypto-item">
              <h3>
                <Link to={`/coin/${crypto.id}`}>
                  {crypto.name} ({crypto.symbol})
                </Link>
              </h3>
              <p>Ranking: {crypto.rank}</p>
              <p>Precio USD: ${parseFloat(crypto.priceUsd).toFixed(2)}</p>
              <p>Market Cap USD: ${parseFloat(crypto.marketCapUsd).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;