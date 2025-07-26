import { useState } from 'react';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const data = await res.json();
      onRegister({ username, id: data.userId });
    } catch (err) {
      alert(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f3f3] to-[#e0e0f5] flex items-center justify-center p-4">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-[#cfcfe2]"
      >
        <h2 className="text-3xl font-bold text-[#6264A7] text-center">Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6264A7]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6264A7]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-[#6264A7] hover:bg-[#464775] text-white w-full py-3 rounded-lg font-medium shadow-md transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
