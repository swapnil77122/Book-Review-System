import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleRegister = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setShowRegister(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return (
      <div className="p-4">
        {showRegister ? (
          <Register onRegister={handleRegister} />
        ) : (
          <Login onLogin={handleLogin} goToRegister={() => setShowRegister(true)} />
        )}
      </div>
    );
  }

  // ✅ After login, show books and logout
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <BookList />
    </div>
  );
}

export default App;
