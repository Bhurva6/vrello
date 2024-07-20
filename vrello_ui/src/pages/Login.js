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
        <div style={styles.buttonContainer}>
          <button style={styles.loginButton} onClick={handleGoogleLogin}>
            <div style={styles.loginButtonState}></div>
            <div style={styles.loginButtonContentWrapper}>
              <div style={styles.loginButtonIcon}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: 'block' }}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span style={styles.loginButtonContents}>Sign in with Google</span>
              <span style={{ display: 'none' }}>Sign in with Google</span>
            </div>
          </button>
        </div>
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
    transform: 'translateX(-50%)',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    height: '40px',
    borderRadius: '20px',
    border: '1px solid #747775',
    backgroundColor: 'white',
    color: '#1f1f1f',
    cursor: 'pointer',
    fontFamily: 'Roboto, arial, sans-serif',
    fontSize: '14px',
    letterSpacing: '0.25px',
    transition: 'background-color .218s, border-color .218s, box-shadow .218s',
    boxSizing: 'border-box',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '400px',
    minWidth: 'min-content',
    boxShadow: '0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15)', // Added shadow
  },
  loginButtonState: {
    transition: 'opacity .218s',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
  },
  loginButtonContentWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  loginButtonIcon: {
    height: '20px',
    marginRight: '12px',
    minWidth: '20px',
    width: '20px',
  },
  loginButtonContents: {
    flexGrow: 1,
    fontFamily: 'Roboto, arial, sans-serif',
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'top',
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
