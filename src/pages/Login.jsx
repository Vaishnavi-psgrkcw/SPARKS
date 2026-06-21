import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // Check if first time login
const isFirstTime = !localStorage.getItem('userPreferences');
window.location.href = isFirstTime ? '/onboarding' : '/dashboard';
    } catch (err) {
      setError('Invalid email or password!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Logo */}
        <div style={styles.logo}>
          <span style={styles.logoText}>⚡ SPARKS</span>
          <p style={styles.logoSub}>
            Smart Personalized Adaptive Learning
            and Knowledge System
          </p>
        </div>

        <h2 style={styles.title}>Welcome Back!</h2>

        {error && (
          <div style={styles.error}>{error}</div>
        )}

        <input
          style={styles.input}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleLogin}
        >
          Login →
        </button>

        <p style={styles.link}>
          Don't have an account?{' '}
          <a href="/register" style={styles.linkText}>
            Register here
          </a>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  logoText: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a237e',
  },
  logoSub: {
    fontSize: '11px',
    color: '#888',
    marginTop: '4px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '24px',
  },
  error: {
    background: '#ffebee',
    color: '#c62828',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
    textAlign: 'center',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '14px',
    marginBottom: '16px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  link: {
    textAlign: 'center',
    color: '#888',
    fontSize: '14px',
  },
  linkText: {
    color: '#1a237e',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};