import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import ArtistsList from './pages/artists/ArtistsList';
import ArtistCreate from './pages/artists/ArtistCreate';
import SongsList from './pages/songs/SongsList';

function App() {
  return (
    <Router>
      <Routes >
        <Route path='/' element={<RootLayout />}>
          <Route index path='/' element={<Home />} />
          <Route path='/artist' >
            <Route path='' element={<ArtistsList />} />
            <Route path='new' element={<ArtistCreate />} />
          </Route>
          <Route path='/songs' element={<SongsList />} >
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

