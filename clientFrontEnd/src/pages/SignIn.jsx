import React, { useState } from 'react';
import { login } from "../apiService.js";
import youtube2 from "../assets/youtube2.svg";
import Register from './Register.jsx';

const SignIn = ({ isOpen, onClose, onLogin }) => {
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            localStorage.setItem('token', response.data.token);
            onLogin(response);

            console.log(response.data.token);
            alert('Login Successfully');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const toggleCreateAccount = () => {
        setIsCreatingAccount((prev) => !prev);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                    <img
                        src={youtube2}
                        alt="YouTube Logo"
                        className="w-44 mx-auto mb-4"
                    />
                    {isCreatingAccount ? (
                        <Register
                            onClose={onClose}
                            switchToLogin={toggleCreateAccount}
                        />
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <input
                                    type="email"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" /> Remember me
                                    </label>
                                    <a href="#" className="text-blue-500 hover:underline">Lost Password?</a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                >
                                    Sign In
                                </button>
                            </form>
                            <button
                                className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                            <p className="mt-4 text-center text-gray-600">
                                Not registered?{' '}
                                <span
                                    onClick={toggleCreateAccount}
                                    className="text-blue-500 cursor-pointer hover:underline"
                                >
                                    Create account
                                </span>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default SignIn;