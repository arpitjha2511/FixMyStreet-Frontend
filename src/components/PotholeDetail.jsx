import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import resolveIcon from '../assets/resolve-icon.png';
import mapIcon from '../assets/map-icon.png';
function PotholeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pothole, setPothole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPothole = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/getPotholeById/${id}`, {
          headers: { 'ngrok-skip-browser-warning': 'true' },
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setPothole(data);
      } catch (err) {
        setError('Failed to load pothole details.');
        console.error('Error fetching pothole:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPothole();
  }, [id]);

  const handleMarkAsResolved = async () => {
    try {
      const response = await fetch(`https://wildcat-mint-actually.ngrok-free.app/markAsResolved/${id}`, {
        method: 'PUT',
        headers: { 'ngrok-skip-browser-warning': 'true' },
      });
      if (!response.ok) throw new Error('Failed to mark pothole as resolved');
      alert('Pothole marked as resolved successfully!');
      navigate('/landing');
    } catch (err) {
      setError('Failed to update pothole status.');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>Pothole Details</h2>
        </div>
        {pothole && (
          <div className="card-body">
            {pothole.image ? (
              <img src={pothole.image} alt="Pothole" className="img-fluid mb-3" style={{ maxWidth: '100%' }} />
            ) : (
              <p>No image available</p>
            )}
            <p><strong>Address:</strong> {pothole.address}</p>
            <p><strong>Threat Level:</strong> {pothole.threat}</p>
            <p><strong>Latitude:</strong> {pothole.latitude}</p>
            <p><strong>Longitude:</strong> {pothole.longitude}</p>
            <p><strong>Submitted By:</strong> {pothole.submittedBy}</p>
            <p><strong>Resolved:</strong> {pothole.resolved ? 'Yes' : 'No'}</p>
            <div className="button-container">
    <a
        href={`https://www.google.com/maps/place/${pothole.latitude},${pothole.longitude}`}
        className="btn btn-outline-success btn-lg mt-3 button-with-icon" // Add `btn-lg` for larger buttons
        target="_blank"
        rel="noopener noreferrer"
    >
        <img src={mapIcon} alt="Map Icon" className="button-icon" /> 
        View on Google Maps
    </a>

    {!pothole.resolved && (
        <button className="btn btn-outline-success btn-lg mt-3 button-with-icon" onClick={handleMarkAsResolved}>
            <img src={resolveIcon} alt="Resolve Icon" className="button-icon" /> 
            Mark as Resolved
        </button>
    )}
</div>

          </div>
        )}
      </div>
    </div>
  );
}

export default PotholeDetail;
