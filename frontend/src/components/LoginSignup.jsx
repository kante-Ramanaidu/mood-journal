import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/LoginSignup.css';
const API_URL = 'https://mood-journal-oc1k.onrender.com';

export default function LoginSignup({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode');

  const [isSignUp, setIsSignUp] = useState(mode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsSignUp(mode === 'signup');
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }

    try {
      const url = `${API_URL}/api/auth/${isSignUp ? 'signup' : 'login'}`;
      console.log('API_URL:', API_URL);
      console.log('Full URL:', url);

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Authentication failed');

      onLogin && onLogin(email);
      setMessage(isSignUp ? 'Registration successful!' : 'Login successful!');
      setEmail('');
      setPassword('');
      navigate('/mood');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const toggleMode = () => {
    const newMode = isSignUp ? 'login' : 'signup';
    navigate(`/login?mode=${newMode}`);
  };

  return (
    <div className="auth-container">
      <h1>Mood Journal</h1>
      <h3>{isSignUp ? 'Create Your Account' : 'Welcome Back!'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
      </form>
      <p className="message">{message}</p>
      <button onClick={toggleMode} className="toggle-auth-mode">
        {isSignUp ? 'Already have an account? Log In' : 'New here? Sign Up'}
      </button>
    </div>
  );
}