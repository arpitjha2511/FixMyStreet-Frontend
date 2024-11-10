// LoginPage.js
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
      const response = await fetch('https://wildcat-mint-actually.ngrok-free.app/validateLogin', {
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
    <div className="container login-container d-flex justify-content-between align-items-center login-page">
      
      {/* Left Panel */}
      <div className="login-left">
        <h1 className="login-title">FixMyStreet</h1>
        <h5 className="login-subtitle">AI powered public infrastructure repair prioritization</h5>
        <div className="login-authors">
          <h4>Made by:</h4>
          <h4>Arpit Jha (41)</h4>
          <h4>Areen Chakraborty (53)</h4>
          <h4>Lakshit Tandon (54)</h4>
          <h4>Mohith Charagondla (55)</h4>
        </div>
      </div>

      {/* Right Panel: Login Box */}
      <div className="login-box card text-center p-4">
        <h3 className="login-heading">Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control my-3 login-input"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control my-3 login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-info btn-block login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
