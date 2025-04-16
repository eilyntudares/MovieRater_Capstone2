import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from "./components/navbar";
import "./App.css";
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";
import {Movie} from "./pages/movie"
import {TvShow} from "./pages/tvshow"
import { Rated } from './pages/rated';
import { Search } from './pages/search';

function App() {
  return (
    <div>
      <Router> 
        <Navbar />
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/rated" element={<Rated/>} />
          <Route path="/movie/:id" element={<Movie/>} />
          <Route path="/tvshow/:id" element={<TvShow />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App