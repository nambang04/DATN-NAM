import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectRouter(props) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn == 'true' ? (
    props.children
  ) : (
    <Navigate to={'/login'} replace={true} />
  );
}
