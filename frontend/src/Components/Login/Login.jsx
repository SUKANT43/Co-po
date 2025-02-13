import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS file
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
        <div className="login-container">
            <div className="login-box">
                <h1>CO-PO CALCULATION</h1> 
                <img src={logo} alt="Logo" className="logo" />
                <h2>Welcome Back Admin!</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Login</button>
                </form>

            </div>
        </div>
    );
}

export default Login;
