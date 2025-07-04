function generateSegments(route, totalSeats, departureTime, dateOfJourney) {
  const segments = [];
  
  // Parse the initial date and time (handling timezone correctly)
  let currentDate = new Date(`${dateOfJourney}T${departureTime}:00Z`);
  
  for (let i = 0; i < route.length - 1; i++) {
    const segmentDeparture = new Date(currentDate);
    
    // Add 60 minutes (1 hour) for this segment's travel time
    currentDate = new Date(currentDate.getTime() + 60 * 60 * 1000);
    
    segments.push({
      from: route[i].trim(),
      to: route[i + 1].trim(),
      date: formatDate(segmentDeparture),
      departureTime: formatTime(segmentDeparture),
      arrivalTime: formatTime(currentDate),
      availableSeats: totalSeats
    });
  }
  
  return segments;
}

// Helper functions with timezone correction
function formatTime(date) {
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

module.exports = generateSegments;