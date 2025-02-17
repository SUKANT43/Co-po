import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import './User.css';

export default function User() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isRegister, setIsRegister] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(""); // 'success' or 'error'
    const [showAlert, setShowAlert] = useState(false);

    const showAlertMessage = (message, type) => {
        setAlertMessage(message);
        setAlertType(type); // success or error
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 4000); // Alert disappears after 4 seconds
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            showAlertMessage("Passwords do not match.", "error");
            return;
        }
        try {
            const response = await axios.post("http://localhost:7009/api/userRegister", { email, password });
            showAlertMessage(response.data.message, "success");
            // Clear fields after successful registration
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            showAlertMessage(error.response?.data?.message || "Registration failed.", "error");
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmNewPassword) {
            showAlertMessage("New passwords do not match.", "error");
            return;
        }
        try {
            const response = await axios.post("http://localhost:7009/api/userChange-password", { email, newPassword });
            showAlertMessage(response.data.message, "success");
            // Clear fields after successful password reset
            setEmail("");
            setNewPassword("");
            setConfirmNewPassword("");
        } catch (error) {
            showAlertMessage(error.response?.data?.message || "Password reset failed.", "error");
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 main-bg">
            <div className="form-container p-4 rounded shadow-lg text-center">
                <h2 className="mb-4 text-light">
                    {isRegister ? "Create Account" : "Reset Password"}
                </h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control mb-3"
                />
                {isRegister ? (
                    <>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control mb-3"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control mb-3"
                        />
                    </>
                ) : (
                    <>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control mb-3"
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="form-control mb-3"
                        />
                    </>
                )}
                <button
                    onClick={isRegister ? handleRegister : handleResetPassword}
                    className="btn btn-primary w-100 mb-3"
                >
                    {isRegister ? "Register" : "Reset Password"}
                </button>
                <button
                    onClick={() => setIsRegister(!isRegister)}
                    className="btn btn-link w-100 text-center text-info"
                >
                    {isRegister ? "Forgot Password?" : "Back to Register"}
                </button>
            </div>

            {showAlert && (
                <motion.div
                    className={`custom-alert ${alertType === "success" ? "alert-success" : "alert-error"} slide-in`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {alertMessage}
                </motion.div>
            )}
        </div>
    );
}
