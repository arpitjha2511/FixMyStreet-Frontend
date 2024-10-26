import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/login.css'; // Import the new CSS file

function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://pumped-enough-newt.ngrok-free.app/validateLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/landing');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="container d-flex justify-content-between align-items-center" style={{ height: '100vh' }}>
      <div>
        <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>FixMyStreet</h1>
        <h5 style={{ fontStyle: 'italic' }}>AI powered public infrastructure repair prioritization</h5>
        <div style={{ textAlign: 'left' }}>
          <h4>Made by:</h4>
          <h4>Arpit</h4>
          <h4>Areen</h4>
          <h4>Lakshit</h4>
          <h4>Mohith</h4>
        </div>
      </div>

      <div className="card text-center p-3" style={{ width: '250px', borderRadius: '10px' }}>
        <h3 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control my-3"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control my-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-dark btn-block">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
