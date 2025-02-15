import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../../assets/bit-logo.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:7008/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
      navigate("/admin"); // Redirect to Admin Page
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div 
      className="container-fluid vh-100 d-flex justify-content-center align-items-center" 
      style={{ backgroundColor: "rgb(15, 23, 42)" }}
    >
      <div 
        className="card p-4" 
        style={{ 
          maxWidth: "400px", 
          width: "100%", 
          backgroundColor: "rgb(30, 41, 59)",
          border: "none" 
        }}
      >
        <h1 className="text-center text-light">CO-PO CALCULATION</h1>
        <div className="text-center">
          <img src={logo} alt="Logo" className="img-fluid mb-3" style={{ maxWidth: "100px" }} />
        </div>
        <h2 className="text-center text-light">Welcome Back Admin!</h2>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
