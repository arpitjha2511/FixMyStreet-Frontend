import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserPotholes() {
  const { searchTerm } = useParams();
  const [potholes, setPotholes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchUserPotholes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/getAllSentByUser/${searchTerm}`, {
          headers: { 'ngrok-skip-browser-warning': 'true' },
        });
        const data = await response.json();
        setPotholes(data);
      } catch (error) {
        console.error('Error fetching user potholes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPotholes();
  }, [searchTerm]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Potholes Reported by {searchTerm}</h1>
      {potholes.length > 0 ? (
        <div className="row">
          {potholes.map((pothole) => (
            <div key={pothole._id} className="col-md-4 mb-4">
              <div
                className="card h-100"
                style={{ cursor: 'pointer' }} // Change cursor to pointer for better UX
                onClick={() => navigate(`/pothole/${pothole._id}`)} // Navigate to PotholeDetail on click
              >
                <img
                  src={pothole.image}
                  alt="Pothole"
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }} // Maintain consistent image height
                />
                <div className="card-body">
                  <h5 className="card-title">Address: {pothole.address}</h5>
                  <p className="card-text">Latitude: {pothole.latitude}</p>
                  <p className="card-text">Longitude: {pothole.longitude}</p>
                  <p className="card-text">Resolved: {pothole.resolved ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No potholes found for {searchTerm}</p>
      )}
    </div>
  );
}

export default UserPotholes;
