import { useState } from 'react';

function Login({ onLogin, goToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const data = await res.json();
      onLogin({ username: data.username, id: data.userId });
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6 transition-all duration-300"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back 👋</h2>
        <p className="text-center text-sm text-gray-500">Please login to your account</p>

        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <span
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            onClick={goToRegister}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
