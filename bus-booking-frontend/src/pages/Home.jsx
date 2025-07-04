// src/pages/Home.jsx
import React, { useState } from 'react';
import api from '../api';
import SearchForm from '../components/SearchForm';
import BusCard from '../components/BusCard';

const Home = () => {
  const [buses, setBuses] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async ({ from, to, date }) => {
    try {
      const res = await api.get('/buses', {
        params: { from, to, date}
      });
      setBuses(res.data);
      setSearched(true);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Bus Search</h2>
      <SearchForm onSearch={handleSearch} />
      {searched && (
        <>
          <h4 style={{ color: 'orangered' }}>Total Trips: {buses.length}</h4>
          {buses.map(bus => (
            <BusCard key={bus._id} bus={bus} />
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
