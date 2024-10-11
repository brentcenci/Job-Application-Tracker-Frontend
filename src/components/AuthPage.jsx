import { useState } from 'react';

function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(false);

    const handleToggle = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="relative w-2/3 h-96 flex transition-all duration-500 rounded-2xl overflow-clip">
                {/* Left side (Sign In or Welcome Back) */}
                <div
                    className={`bg-gray-800 text-white p-6 flex flex-col justify-center transition-all duration-500 transform ${isSignIn ? 'w-2/3' : 'w-1/3'}`}>
                    <h2 className="text-3xl font-bold">{isSignIn ? 'Sign In' : 'Welcome Back'}</h2>
                    {isSignIn ? (
                        <div className="flex flex-col mt-6">
                            <input
                                type="text"
                                placeholder="Username"
                                className="p-2 mb-4 rounded border focus:outline-none"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="p-2 mb-4 rounded border focus:outline-none"
                            />
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
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
                    className={`bg-white text-gray-800 p-6 flex flex-col justify-center transition-all duration-500 transform ${isSignIn ? 'w-1/3' : 'w-2/3'}`}>
                    {isSignIn ? (
                        <>
                            <h2 className="text-3xl font-bold">New User?</h2>
                            <p className="mt-4 text-sm">Create an account with us!</p>
                            <button
                                onClick={handleToggle}
                                className="bg-gray-800 hover:bg-gray-700 mt-6 text-white font-bold py-2 px-4 rounded">
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col mt-6">
                            <h2 className="text-3xl font-bold">Register</h2>
                            <input
                                type="text"
                                placeholder="Username"
                                className="p-2 mt-6 mb-4 rounded border focus:outline-none"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="p-2 mb-4 rounded border focus:outline-none"
                            />
                            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
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
