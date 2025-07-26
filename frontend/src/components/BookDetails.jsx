import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';

const API_URL = import.meta.env.VITE_API_URL;

function BookDetails({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState(0);

  const fetchReviews = () => {
    fetch(`${API_URL}/api/reviews/${bookId}`)
      .then(res => res.json())
      .then(setReviews)
      .catch(err => console.error('Failed to fetch reviews:', err));

    fetch(`${API_URL}/api/average-rating/${bookId}`)
      .then(res => res.json())
      .then(data => setAvg(data.average))
      .catch(err => console.error('Failed to fetch average rating:', err));
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-2">📘 Book ID: {bookId}</h2>
      <p className="text-gray-700 mb-3">⭐ Average Rating: {avg || 0}</p>

      <ReviewForm bookId={bookId} onReviewSubmitted={fetchReviews} />

      <h3 className="mt-5 text-lg font-semibold">User Reviews:</h3>
      <div className="mt-3 max-h-60 overflow-y-auto space-y-4">
        {reviews.length > 0 ? (
          reviews.map((r, index) => (
            <div key={index} className="border-b pb-2">
              <p className="text-sm font-semibold text-gray-800">{r.username}</p>
              <p className="text-yellow-500">⭐ {r.rating}</p>
              <p className="text-gray-700">{r.text}</p>
              <p className="text-xs text-gray-400">
                {new Date(r.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
