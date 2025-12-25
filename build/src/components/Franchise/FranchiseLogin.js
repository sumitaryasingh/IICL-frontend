import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { toast } from "react-toastify";
import "./styles/franchiseAuth.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { registerUser } from "../../services/franchiseLoginRegister";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
const FranchiseLogin = () => {
    const navigate = useNavigate(); // ✅ React Router navigation
    const [isSignUp, setIsSignUp] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        franchiseId: 0,
        adminId: 0,
    });
    const handleClickEnquire = () => {
        navigate("/franchise/form");
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // Helper function to save franchiseId to local storage
    const saveFranchiseIdToLocalStorage = (id) => {
        localStorage.setItem("franchiseId", id.toString());
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (isSignUp) {
                await registerUser(formData);
            }
            else {
                const response = await loginUser(formData);
                if (response) {
                    const { adminId, franchiseId, user } = response;
                    // Save common data
                    if (user?.role)
                        localStorage.setItem("role", user.role);
                    // Save franchiseId only for franchise
                    if (user?.role === "franchise" && franchiseId) {
                        localStorage.setItem("franchiseId", franchiseId.toString());
                        toast.success("Franchise login successful");
                    }
                    // Show different toast for admin
                    if (user?.role === "admin" && adminId) {
                        localStorage.setItem("AdminId", adminId.toString());
                        toast.success("Admin login successful");
                    }
                    // Redirect to dashboard (you can also conditionally redirect if needed)
                    navigate("/dashboard");
                }
                else {
                    toast.error("Login failed: No response received.");
                }
            }
        }
    };
    const validateForm = () => {
        const { email, password } = formData;
        if (!email || !password) {
            toast.error("Email and password are required!");
            return false;
        }
        if (isSignUp && !formData.name) {
            toast.error("Name is required for sign-up!");
            return false;
        }
        return true;
    };
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    return (_jsx("div", { className: "body-container", children: _jsxs("div", { className: `container ${isSignUp ? "right-panel-active" : ""}`, children: [_jsx("div", { className: "form-container sign-up-container", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("h1", { children: "Enquire for Franchise" }), _jsx("span", { style: { fontSize: "18px" }, children: "Fill the Franchise Form for registration" }), _jsx("button", { onClick: handleClickEnquire, style: { marginTop: "30px" }, type: "submit", children: "Enquire Now" })] }) }), _jsx("div", { className: "form-container sign-in-container", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("h1", { children: "Sign In" }), _jsx("span", { children: "or use your account" }), _jsx("input", { type: "email", name: "email", placeholder: "Email", value: formData.email, onChange: handleInputChange }), _jsxs("div", { style: { position: "relative", width: "100%" }, children: [_jsx("input", { type: isPasswordVisible ? "text" : "password", name: "password", placeholder: "Password", value: formData.password, onChange: handleInputChange }), _jsx("div", { onClick: togglePasswordVisibility, style: {
                                            position: "absolute",
                                            right: "10px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            cursor: "pointer",
                                        }, children: isPasswordVisible ? (_jsx(AiOutlineEye, { size: 24 })) : (_jsx(AiOutlineEyeInvisible, { size: 24 })) })] }), _jsx("button", { type: "submit", children: "Sign In" })] }) }), _jsx("div", { className: "overlay-container", children: _jsxs("div", { className: "overlay", children: [_jsxs("div", { className: "overlay-panel overlay-left", children: [_jsx("h1", { children: "Welcome Back!" }), _jsx("p", { children: "To keep connected with us please login with your personal info" }), _jsx("button", { className: "ghost", onClick: () => setIsSignUp(false), children: "Sign In" })] }), _jsxs("div", { className: "overlay-panel overlay-right", children: [_jsx("h1", { children: "Hello, Friend!" }), _jsx("p", { children: "Enter your personal details and start your journey with us" }), _jsx("button", { className: "ghost", onClick: () => setIsSignUp(true), children: "New Franchise" })] })] }) })] }) }));
};
export default FranchiseLogin;
