import React, { useState } from 'react';
import { login, logout, getProducts, getMeta} from '../api';

const Account = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [protectedData, setProtectedData] = useState('');
  const [error, setError] = useState('');

  getMeta('Order');

  const handleLogin = async () => {
    try {
      await login(credentials);
      setError('');
      alert('Login successful');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    logout();
    alert('Logged out successfully');
  };

  const products = async () => {
    const data = await getProducts();
  };


  return (

    <div class="grid h-screen place-content-center ">
    <div className="flex flex-col  items-center gap-4 p-5 mb-24">

      <h1 className="text-3xl font-semibold">Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="p-2 border border-gray-300 rounded-lg w-64"
      />
      
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="p-2 border border-gray-300 rounded-lg w-64"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 rounded-lg w-64 hover:bg-blue-600"
      >
        Login
      </button>

      <button
        onClick={handleLogout}
        className="bg-gray-500 text-white p-2 rounded-lg w-64 hover:bg-gray-600"
      >
        Logout
      </button>

  {error && <p className="text-red-500">{error}</p>}

</div>
</div>

  );
};

export default Account;
