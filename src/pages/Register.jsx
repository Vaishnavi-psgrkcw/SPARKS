import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'student'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/auth/register',
        form
      );
      setSuccess('Registration successful! Please login.');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      setError('Registration failed. Try again!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.logo}>
          <span style={styles.logoText}>⚡ SPARKS</span>
        </div>

        <h2 style={styles.title}>Create Account</h2>

        {error && (
          <div style={styles.error}>{error}</div>
        )}
        {success && (
          <div style={styles.success}>{success}</div>
        )}

        <input
          style={styles.input}
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
        />

        <select
          style={styles.input}
          value={form.role}
          onChange={e => setForm({...form, role: e.target.value})}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        <button
          style={styles.button}
          onClick={handleRegister}
        >
          Create Account →
        </button>

        <p style={styles.link}>
          Already have an account?{' '}
          <a href="/" style={styles.linkText}>Login here</a>
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
  logo: { textAlign: 'center', marginBottom: '16px' },
  logoText: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a237e'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '24px'
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
  success: {
    background: '#e8f5e9',
    color: '#2e7d32',
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
    fontSize: '14px'
  },
  linkText: {
    color: '#1a237e',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
};