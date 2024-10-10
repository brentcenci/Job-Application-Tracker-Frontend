import {useState} from "react";
import authService from "../services/authService.js";
import {useAuth} from "../services/authState.jsx";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {login, isAuthenticated} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.attemptLogin(username, password);
            if (response.token) {
                login(response.token);
            }

        } catch (error) {
            console.log(error);
            setError(error);
        }
    }

    return (
        <>
            <h2>Login Form</h2>
            <p>Authentication status: {isAuthenticated ? "Authenticated" : "Not Authenticated"}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </>
    )
};

export default Login;