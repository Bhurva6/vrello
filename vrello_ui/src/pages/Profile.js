import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(currentUser.photoURL || "/default-avatar.png");
  const [uploading, setUploading] = useState(false);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateProfile(currentUser, { photoURL: url });
      setProfileImage(url);
      setUploading(false);
    }
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.userSection} onClick={handleProfileClick}>
          <img src={currentUser.photoURL || "/default-avatar.png"} alt="User Avatar" style={styles.userImage} />
          <h2 style={styles.profileUserName}>
            Welcome, {currentUser && currentUser.displayName}
            <span style={styles.pencilIcon}>✎</span>
          </h2>
        </div>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div style={styles.container}>
        <div style={styles.profileCard}>
          <label htmlFor="profileImageUpload" style={styles.profileImageLabel}>
            <img
              src={profileImage}
              alt="User Avatar"
              style={styles.profileImage}
              title="Click to upload a new profile picture"
            />
          </label>
          <input
            type="file"
            id="profileImageUpload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          {uploading && <p style={styles.uploadingText}>Uploading...</p>}
          <h2 style={styles.userName}>{currentUser.displayName}</h2>
          <p style={styles.userEmail}>{currentUser.email}</p>
        </div>
      </div>
    </>
  );
};

const styles = {
  navbar: {
    fontFamily: '"Roboto", sans-serif',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#392F5A',
    color: '#fff',
    width: '100vw',
    margin: 0,
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: 'white',
    position: 'relative',
    transition: 'color 0.3s',
  },
  userImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
    backgroundColor: 'white',
  },
  profileUserName: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    color: '#fff',
    margin: 0,
  },
  pencilIcon: {
    marginLeft: '5px',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  profileImageLabel: {
    cursor: 'pointer',
    display: 'inline-block',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  userName: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  userEmail: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '16px',
    color: '#555',
  },
  uploadingText: {
    fontSize: '14px',
    color: '#888',
    marginTop: '10px',
  },
  logoutButton: {
    backgroundColor: '#FF8811',
    color: '#fff',
    border: 'none',
    padding: '12px',
    marginRight: '30px',
    cursor: 'pointer',
    borderRadius: '50px',
    fontSize: '16px',
  },
};

export default Profile;
