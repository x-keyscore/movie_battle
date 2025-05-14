# **Cinéscope**

Cinéscope is a web application that allows users to search over 1 million movies, explore by genre, view detailed movie information, and manage a personal watchlist. Built with [The Movie Database (TMDb)](https://www.themoviedb.org/) API.

## Features

### 🎥 Header
- **Search bar** to find movies by name.
- **Genre selector** to browse movies by category.
- **Watchlist** to view and manage locally saved movies.
- **Dynamic hero banner** displaying featured movies based on user interaction.

### 🎞️ Home Page
- Scrollable horizontal **lists of movies** by categories like Popular, Top Rated, etc.
- Movie cards with options to **view details** or **add/remove from watchlist**.

### 🎞️ Movie Details Page
- Selection of **similar movies**.
- Detailed movie information (release date, runtime, budget, etc.).
- Cast section displaying actor cards.

### 🎞️ Category Page
- **Infinite scroll** of movie cards filtered by genre.

### 🎬 Footer
- Copyright and GitHub repo link
- Link to [TMDb](https://www.themoviedb.org/)

## Technologies Used
- `React` (with TypeScript)
- `React Router` – for client-side routing
- `Axios` – for HTTP requests
- `clsx` – for conditional class management
- `CSS` – for styling
- `TMDb API` – for movie data

## Setup & Installation

```bash
# Clone the repo
git clone https://github.com/x-keyscore/movie_battle.git cinescope

# Navigate to the folder
cd cinescope

# If using a bundler or dev server, e.g., for Vite/Parcel/React
npm install
npm run dev
```

## Acknowledgements

This product uses the TMDb API but is not endorsed or certified by TMDb.