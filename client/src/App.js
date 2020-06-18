import React from 'react';
import { useAuth0 } from './contexts/auth0-context';
import FilesPage from './FilesPage';

function App() {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();

  return (
    <FilesPage 
      authLoading={isLoading} 
      user={user} 
      loginWithRedirect={loginWithRedirect} 
      logout={logout} />
  );
}

export default App;