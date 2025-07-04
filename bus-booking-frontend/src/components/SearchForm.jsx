// src/components/SearchForm.jsx
import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    // passengers: 1
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input type="text" name="from" placeholder="Source" value={formData.from} onChange={handleChange} required />
      <input type="text" name="to" placeholder="Destination" value={formData.to} onChange={handleChange} required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      {/* <input type="number" name="passengers" min="1" value={formData.passengers} onChange={handleChange} required /> */}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
