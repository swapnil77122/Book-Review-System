# Book Review System

A simple web application for users to register, log in, and review books.

## Features

- User registration and login
- Persistent authentication using localStorage
- Book listing (and review functionality, if implemented)
- Logout functionality

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express (assumed, update if different)
- **API:** RESTful endpoints for authentication and books

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/book-review-system.git
   cd book-review-system
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../backend
   npm install
   ```

### Running the App

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```
   The backend should run on [http://localhost:5000](http://localhost:5000).

2. **Start the frontend:**
   ```bash
   cd ../frontend
   npm start
   ```
   The frontend should run on [http://localhost:3000](http://localhost:3000).

### Usage

- Register a new account or log in with existing credentials.
- After logging in, you can view the list of books.
- Click "Logout" to end your session.

### Project Structure

```
Book-Review-System-main/
├── backend/
│   └── ... (Express API code)
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       └── BookList.jsx
│   └── ...
└── README.md
```

### Environment Variables

- Configure backend API URLs if needed in the frontend (e.g., in `.env`).

### Notes

- Make sure your backend CORS settings allow requests from the frontend.
- User data is stored in `localStorage` for session persistence.

## License

MIT

---

