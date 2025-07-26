const users = require('./data/users.json');

function login(req, res) {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.json({
      message: 'Login successful',
      userId: user.id,
      username: user.username
    });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
}

module.exports = { login };
