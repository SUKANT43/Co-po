import { useState } from "react";
import axios from "axios";
import './User.css'
export default function User() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isRegister, setIsRegister] = useState(true);

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:7009/api/userRegister", { email, password });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await axios.post("http://localhost:7009/api/userChange-password", { email, newPassword });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-2xl font-bold mb-4">{isRegister ? "Create Account" : "Reset Password"}</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded mb-2"
            />
            {isRegister ? (
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded mb-2"
                />
            ) : (
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="p-2 border rounded mb-2"
                />
            )}
            <button
                onClick={isRegister ? handleRegister : handleResetPassword}
                className="p-2 bg-blue-500 text-white rounded"
            >
                {isRegister ? "Register" : "Reset Password"}
            </button>
            <button
                onClick={() => setIsRegister(!isRegister)}
                className="mt-4 text-blue-500 underline"
            >
                {isRegister ? "Forgot Password?" : "Back to Register"}
            </button>
        </div>
    );
}
