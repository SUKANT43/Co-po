import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import AdminPage from './Components/AdminPage/AdminPage';
import History from './Components/History/History';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
