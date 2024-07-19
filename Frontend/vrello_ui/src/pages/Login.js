import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      // Redirect to the dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error("Error logging in with Google", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h2 style={styles.title}>Vrello</h2>
        <h3 style={styles.subtitle}>Your Ultimate Task Management Tool</h3>
        <button style={styles.loginButton} onClick={handleGoogleLogin}>Continue with Google</button>
      </div>
      <img src="/vrello.gif" alt="Login GIF" style={styles.gif} />
      <footer style={styles.footer}>
        <p>© 2024 Vrello. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '"Roboto", sans-serif',
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    left: '50%',
    top:'2%',
    transform: 'translate(-50%, -20%)',
    zIndex: 1,
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '5rem',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  loginButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#BF40BF	',
    color: '#fff',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Added shadow
  },
  gif: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  footer: {
    position: 'absolute',
    bottom: '10px',
    width: '100%',
    textAlign: 'center',
    zIndex: 1,
  },
};

export default Login;
