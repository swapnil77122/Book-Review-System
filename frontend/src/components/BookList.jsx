import { useEffect, useState } from 'react';
import BookDetails from './BookDetails';

const API_URL = import.meta.env.VITE_API_URL;

function BookList() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/books`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => setBooks(data))
      .catch(err => console.error('❌ Failed to fetch books:', err));
  }, []);

  const handleOpen = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedBook(null);
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-[#1f3a93] mb-6 text-center sm:text-left">📚 All Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <div
            key={book.id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-56 object-cover rounded-md mb-3"
              />
            )}
            <h3 className="text-xl font-semibold text-indigo-700 mb-1">{book.title}</h3>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-600">Genre: {book.genre}</p>
            <p className="text-sm text-gray-600">Year: {book.year}</p>
            <p className="text-sm text-gray-700 mt-2 line-clamp-3">{book.description}</p>
            <p className="text-yellow-500 mt-2 font-medium">⭐ {book.averageRating || 0}</p>
            <button
              onClick={() => handleOpen(book)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
              onClick={handleClose}
            >
              &times;
            </button>
            <BookDetails bookId={selectedBook.id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
