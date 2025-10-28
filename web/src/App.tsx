import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes >
        <Route path='/' element={<RootLayout />}>
          <Route index path='/' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

