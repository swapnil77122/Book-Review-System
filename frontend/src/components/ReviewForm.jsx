import { useState } from 'react';

function ReviewForm({ bookId, onReviewSubmitted }) {
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user?.username || 'Anonymous';

    fetch(`${import.meta.env.VITE_API_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, rating, text, username }),
    })
      .then((res) => res.json())
      .then(() => {
        setRating('');
        setText('');
        onReviewSubmitted(); // Refresh reviews
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
        placeholder="Rating (1-5)"
        className="border px-2 py-1 rounded w-full"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        placeholder="Write your review..."
        className="border px-2 py-1 rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;
