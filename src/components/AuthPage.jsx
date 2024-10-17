import { useState } from 'react';
import {useAuth} from "@/src/services/authState.jsx";
import authService from "@/src/services/authService.js";
import {HttpStatusCode} from "axios";

function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const {login, isAuthenticated} = useAuth()

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await authService.attemptLogin(username, password);
            if (response.token) {
                login(response.token);
            }
        } catch (error) {
            console.log("Error Logging In:", error);
            setError(error);
        }
    }

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await authService.attemptRegister(username, password);
            if (response.status === HttpStatusCode.Created) {
                const loginResponse = await authService.attemptLogin(username, password);
                if (loginResponse.token) {
                    login(loginResponse.token);
                }
            }
            else {
                console.log(response.data)
            }
        } catch (error) {
            console.log("Error Registering:", error);
            setError(error);
        }
    }

    const handleToggle = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            <div className="relative w-full mx-2 md:w-2/3 h-96 flex transition-all duration-500 rounded-2xl overflow-clip">
                {/* Left side (Sign In or Welcome Back) */}
                <div
                    className={`bg-gray-800 text-white py-6 flex flex-col justify-center transition-all duration-500 transform ${isSignIn ? 'w-3/5 md:w-2/3 p-6 md:p-24 xl:px-48' : 'w-2/5 md:w-1/3 p-3'}`}>
                    <h2 className="text-xl md:text-3xl font-bold">{isSignIn ? 'Sign In' : 'Welcome Back'}</h2>
                    {isSignIn ? (
                        <div className="flex flex-col mt-6">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="p-2 mb-4 rounded border focus:outline-none text-gray-800"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="p-2 mb-4 rounded border focus:outline-none text-gray-800"
                            />
                            <button
                                onClick={handleLoginSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Sign In
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="mt-6 text-sm">To keep connected with us</p>
                            <button
                                onClick={handleToggle}
                                className="bg-blue-500 hover:bg-blue-600 mt-4 text-white font-bold py-2 px-4 rounded">
                                Sign In
                            </button>
                        </>
                    )}
                </div>

                {/* Right side (Sign Up or New User?) */}
                <div
                    className={`bg-white text-gray-800 p-6 flex flex-col justify-center transition-all duration-500 transform ${isSignIn ? 'w-2/5 md:w-1/3 p-3' : 'w-3/5 md:w-2/3 p-6 md:p-24 xl:px-48'}`}>
                    {isSignIn ? (
                        <>
                            <h2 className="text-xl md:text-3xl font-bold">New User?</h2>
                            <p className="mt-4 text-sm">Create an account with us!</p>
                            <button
                                onClick={handleToggle}
                                className="bg-gray-800 hover:bg-gray-700 mt-6 text-white font-bold py-2 px-4 rounded">
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col mt-6">
                            <h2 className="text-xl md:text-3xl font-bold">Register</h2>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="p-2 mt-6 mb-4 rounded border focus:outline-none"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="p-2 mb-4 rounded border focus:outline-none"
                            />
                            <button
                                onClick={handleRegistrationSubmit}
                                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
