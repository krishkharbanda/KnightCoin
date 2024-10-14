import React from 'react';
import { signInWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-primary text-center mb-4">
          KnightCoin Login
        </h1>
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-secondary py-2 rounded hover:bg-white hover:text-primary border"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
