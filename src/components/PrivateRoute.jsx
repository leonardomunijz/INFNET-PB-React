// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth, db } from '../auth/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const PrivateRoute = ({ element: Component, requiredRole, ...rest }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role);
          } else {
            setUserRole('collaborator'); // Default role if no data found
          }
        } else {
          setUserRole('collaborator'); // Default role if not authenticated
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter o papel do usuário:', error);
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Route
      {...rest}
      element={
        userRole === requiredRole || requiredRole === 'any'
          ? <Component />
          : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
