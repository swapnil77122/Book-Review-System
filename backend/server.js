const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const books = require('./data/books.json');
const USERS_PATH = path.join(__dirname, 'data', 'users.json');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(bodyParser.json());

let reviews = [];

// 🔓 Utility to load users fresh (avoid require cache)
const getUsers = async () => {
  try {
    return await fs.readJson(USERS_PATH);
  } catch {
    return [];
  }
};

// 🔐 Register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const users = await getUsers();

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser = {
    id: 'u' + uuidv4(),
    username,
    password
  };

  users.push(newUser);

  try {
    await fs.writeJson(USERS_PATH, users, { spaces: 2 });
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (err) {
    console.error('Error writing users.json:', err);
    res.status(500).json({ message: 'Server error while registering user' });
  }
});

// 🔑 Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await getUsers();

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login successful', userId: user.id, username: user.username });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// 📚 Books
app.get('/api/books', (req, res) => {
  const enrichedBooks = books.map(book => {
    const bookReviews = reviews.filter(r => r.bookId === String(book.id));
    const avg = bookReviews.length
      ? bookReviews.reduce((sum, r) => sum + parseInt(r.rating), 0) / bookReviews.length
      : 0;
    return { ...book, averageRating: parseFloat(avg.toFixed(1)) };
  });
  res.json(enrichedBooks);
});

// 📘 Single book
app.get('/api/book/:id', (req, res) => {
  const book = books.find(b => String(b.id) === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// 📝 Submit review
app.post('/api/reviews', (req, res) => {
  const { bookId, rating, text, username = 'Anonymous' } = req.body;
  const review = {
    id: reviews.length + 1,
    username,
    bookId: String(bookId),
    rating: parseInt(rating),
    text,
    timestamp: new Date().toISOString()
  };
  reviews.push(review);
  res.status(201).json({ message: 'Review submitted', review });
});

// 🗂️ Get reviews for a book
app.get('/api/reviews/:bookId', (req, res) => {
  const bookReviews = reviews.filter(r => r.bookId === String(req.params.bookId));
  res.json(bookReviews);
});

// 📊 Get average rating
app.get('/api/average-rating/:bookId', (req, res) => {
  const bookReviews = reviews.filter(r => r.bookId === String(req.params.bookId));
  if (bookReviews.length === 0) return res.json({ average: 0 });
  const avg = bookReviews.reduce((sum, r) => sum + parseInt(r.rating), 0) / bookReviews.length;
  res.json({ average: avg.toFixed(1) });
});

// 🖼️ Serve images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
