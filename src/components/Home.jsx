import {useAuth} from "../services/authState.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

const Home = () => {

    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Login/>
    }
    return <Dashboard/>
};

export default Home;