import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Key } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle authentication/registration
    // For this example, we'll just set isLoggedIn to true
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const generateSecretKey = () => {
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setSecretKey(key);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl p-8 max-w-md w-full`}>
        <h2 className="text-3xl font-bold text-center mb-6">
          {isRegistering ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
        </form>
        <div className="mt-6">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isRegistering ? 'Already have an account? Sign In' : 'Need an account? Register'}
          </button>
        </div>
        {!isRegistering && (
          <div className="mt-4 text-center">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;