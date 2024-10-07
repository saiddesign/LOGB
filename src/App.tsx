import React from 'react';
import Login from './components/Login';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  const setIsLoggedIn = (value: boolean) => {
    console.log('Login status:', value);
  };

  return (
    <ThemeProvider>
      <Login setIsLoggedIn={setIsLoggedIn} />
    </ThemeProvider>
  );
};

export default App;