import {useAuth} from "../services/authState.jsx";
import AuthPage from "@/src/components/AuthPage.jsx";
import Dash from "@/src/components/Dash.jsx";

const Home = () => {

    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <AuthPage/>
    }
    return <Dash/>
};

export default Home;