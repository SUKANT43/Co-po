import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import AdminPage from "./Components/AdminPage/AdminPage";
import History from "./Components/History/History";
import User from "./Components/User/User";
import Navbar from "./Components/Navbar/Navbar";
function App() {
  return (
    <Router>
      {/* Show Navbar only if not on Login page */}
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/history" element={<History />} />
                <Route path="/user" element={<User />} />
              </Routes>
            </>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
