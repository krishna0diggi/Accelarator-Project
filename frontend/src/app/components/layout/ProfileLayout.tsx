import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ROLES } from '../../lib/roles';
import { Link, useLocation } from 'react-router-dom';

const ProfileLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (user?.role === ROLES.ADMIN || user?.role === ROLES.SUPER_ADMIN) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const renderContentByRole = () => {
    if (!user) {
      return (
        <p style={{ color: 'gray' }}>
          ⚠️ No user found.{' '}
          <Link to="/login" style={{ color: '#1976d2' }}>
            Please log in.
          </Link>
        </p>
      );
    }

    switch (user.role) {
      case ROLES.ADMIN:
        return <p>🔧 Welcome, {user.name}</p>;
      case ROLES.USER:
        return <p>Welcome, {user.name}</p>;
      default:
        return <p>Hey Hacker</p>;
    }
  };

  const currentPath = location.pathname;
  const isOnApps = currentPath.startsWith('/apps');
  const isOnAdmin = currentPath.startsWith('/datacruize');


  const showToggle = isAdmin && (isOnApps || isOnAdmin);
  const toggleLinkPath = isOnApps ? '/datacruize' : '/apps';
  const toggleLinkLabel = isOnApps ? 'Go to Admin Panel' : 'Explore Apps';

  return (
    <div style={{ padding: '1rem' }}>
      {/* <h2 style={{ fontWeight: 'bold' }}>Profile Summary</h2> */}
      {renderContentByRole()}

      {showToggle && (
        <p style={{ marginTop: '1rem', color: 'green' }}>
          <Link to={toggleLinkPath} style={{ color: '#1976d2' }}>
            {toggleLinkLabel}
          </Link>
        </p>
      )}
    </div>
  );
};

export default ProfileLayout;
