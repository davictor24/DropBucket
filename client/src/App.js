import React from 'react';
import { useAuth0 } from './contexts/auth0-context';
import FilesPage from './components/FilesPage';

function App() {
  const { isLoading, user, loginWithRedirect, getTokenSilently, logout } = useAuth0();

  return (
    <FilesPage
      authLoading={isLoading}
      user={user}
      loginWithRedirect={loginWithRedirect}
      getTokenSilently={getTokenSilently}
      logout={logout} />
  );
}

export default App;