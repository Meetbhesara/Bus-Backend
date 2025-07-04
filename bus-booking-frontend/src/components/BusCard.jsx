// src/components/BusCard.jsx
import React from 'react';
import './BusCard.css'; // Optional, or use inline styles

const BusCard = ({ bus }) => {
  const { busNumber, route, departureTime, segments, price, totalSeats, busType } = bus;

  const origin = route[0];
  const destination = route[route.length - 1];

  const duration = (() => {
    if (segments && segments.length > 0) {
      const start = segments[0].departureTime;
      const end = segments[segments.length - 1].arrivalTime;
      return `${start} - ${end}`;
    }
    return '';
  })();

  return (
    <div className="bus-card">
      <div>
        <h3 style={{ color: 'red', margin: 0 }}>{busNumber}</h3>
        <small>[via - {route.slice(1, -1).join(' → ')}]</small>
        <p><strong>Dept.Time:</strong> {departureTime}</p>
        <p><strong>Origin:</strong> {origin}</p>
        <p><strong>Destination:</strong> {destination}</p>
        <p><strong>Duration:</strong> {duration}</p>
        <p><strong>Fare:</strong> ₹{price}</p>
        <p><strong>Bus Type:</strong> {busType}</p>
      </div>
      <div className="bus-right">
        <button className="btn-book">{totalSeats} Select Seat/s</button>
      </div>
    </div>
  );
};

export default BusCard;
