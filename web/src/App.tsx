import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Artists from './pages/Artists';

function App() {
  return (
    <Router>
      <Routes >
        <Route path='/' element={<RootLayout />}>
          <Route index path='/' element={<Home />} />
          <Route index path='/artist' element={<Artists />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

