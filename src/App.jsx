import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import {AuthProvider} from "./services/authState.jsx";
import Dash from "@/src/components/Dash.jsx";
import AuthPage from "@/src/components/AuthPage.jsx";

function App() {

    return (
        <>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<AuthPage />} />
                    </Routes>
                </Router>
            </AuthProvider>


        </>
    )
}

export default App
