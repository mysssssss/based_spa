import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  if (localStorage.getItem('token')) {
    const isAuthenticated = true;
    if (isAuthenticated === true) {
      return children;
    }
  } else {
    return <Navigate to="/admin/login" />;
  }
};
