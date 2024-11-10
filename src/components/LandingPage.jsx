import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PotholeList() {
  const [potholes, setPotholes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('getAllCases');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPotholes = async () => {
      setLoading(true);
      // const baseUrl = 'wildcat-mint-actually.ngrok-free.app';
      const baseUrl = 'http://localhost:3000';
      const endpointMap = {
        getAllCases: '/getAllCases',
        getResolvedCases: '/getAllResolved',
        getPendingCases: '/getAllPending',
      };
      const url = `${baseUrl}${endpointMap[filter]}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        const data = await response.json();
        setPotholes(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPotholes();
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>List of Potholes</h1>
      <div className="btn-group btn-group-toggle mb-3" role="group" aria-label="Filter options">
        <button
          type="button"
          className={`btn btn-primary ${filter === 'getAllCases' ? 'active' : ''}`}
          onClick={() => handleFilterChange('getAllCases')}
        >
          View All
        </button>
        <button
          type="button"
          className={`btn btn-primary ${filter === 'getResolvedCases' ? 'active' : ''}`}
          onClick={() => handleFilterChange('getResolvedCases')}
        >
          View Resolved
        </button>
        <button
          type="button"
          className={`btn btn-primary ${filter === 'getPendingCases' ? 'active' : ''}`}
          onClick={() => handleFilterChange('getPendingCases')}
        >
          View Pending
        </button>
      </div>

      <div className="row">
        {potholes.length === 0 ? (
          <p>No potholes available</p>
        ) : (
          potholes.map((pothole) => (
            <div
              key={pothole._id}
              className="col-md-4 mb-4"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/pothole/${pothole._id}`)}
            >
              <div className="card h-100">
                {pothole.image && (
                  <img src={pothole.image} alt="Pothole" className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                )}
                <div className="card-body">
                  <h5 className="card-title">Address: {pothole.address}</h5>
                  <h5 className="card-text">Threat Level: {pothole.threat}</h5>
                  <p className="card-text">Latitude: {pothole.latitude}</p>
                  <p className="card-text">Longitude: {pothole.longitude}</p>
                  <p className="card-text">Submitted By: {pothole.submittedBy}</p>
                  <p className="card-text">Resolved: {pothole.resolved ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PotholeList;
