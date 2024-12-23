import React, { useState } from 'react';
import { register } from '../apiService';

const Register = ({ onClose, switchToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({ username, email, password });

            // Clear fields after registration
            setUsername('');
            setEmail('');
            setPassword('');

            // Switch to login page
            switchToLogin();
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create Account</h2>
                <form className="space-y-4" onSubmit={handleRegister}>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Password"
                        autoComplete="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Register
                    </button>
                </form>
                <button
                    className="w-full py-2 mt-4 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                >
                    Close
                </button>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <span
                        onClick={switchToLogin}
                        className="text-blue-500 cursor-pointer hover:underline"
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
