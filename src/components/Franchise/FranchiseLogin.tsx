import React, { useState } from "react";
import { toast } from "react-toastify";
import './styles/franchiseAuth.css'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { loginUser, registerUser } from "../../services/franchiseLoginRegister";
type FormData = {
    name?: string;
    email: string;
    password: string;
};

const FranchiseLogin = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            if (isSignUp) {
                await registerUser(formData);
            } else {
                await loginUser(formData);
            }
        }
    };

    const validateForm = (): boolean => {
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

    return (
        <div className='body-container'>
            <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <span>or use your email for registration</span>
                        {isSignUp && (
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name || ""}
                                onChange={handleInputChange}
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Sign In</h1>
                        <span>or use your account</span>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />

                        <div style={{ position: 'relative', width: "100%" }}>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <div
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                }}
                            >
                                {isPasswordVisible ? (
                                    <AiOutlineEye size={24} />
                                ) : (
                                    <AiOutlineEyeInvisible size={24} />
                                )}
                            </div>
                        </div>

                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={() => setIsSignUp(false)}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button className="ghost" onClick={() => setIsSignUp(true)}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FranchiseLogin;
