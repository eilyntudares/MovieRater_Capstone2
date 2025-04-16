# MovieRater

A modern web application built with React and TypeScript that allows users to discover, rate, and review movies. This project serves as a capstone project demonstrating full-stack development skills.

## Features

- Browse and search for movies
- Rate movies on a scale of 1-5 stars
- Write and read movie reviews
- User authentication and personalized profiles
- Responsive design for optimal viewing on all devices

**Navigation**: Uses React Router for page navigation
**Authentication8**: Has a dedicated auth page for user login/signup
**Movie Management**:
- Browse movies on the home page
- View individual movie details
- Rate moviesw
- View rated movies in a separate section
- TV Shows: Separate section for TV show ratings


## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Semantic UI React
- **State Management**: React Query
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Development Tools**: ESLint, TypeScript

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

The project is organized into several main directories:
- src/: Contains all the source code
- src/components/: Reusable UI components
- src/pages/: Different pages/screens of the application
- public/: Static assets like images


App.tsx: The main application component that:
- Sets up routing using React Router
- Defines all the main pages/routes:
  - Home page (/)
  - Authentication page (/auth)
  - Rated movies page (/rated)
  - Individual movie page (/movie/:id)
  - TV show page (/tvshow/:id)
- main.tsx: The entry point that renders the React application





## Contributing

This is a capstone project for educational purposes. Feel free to explore the codebase and learn from the implementation.
