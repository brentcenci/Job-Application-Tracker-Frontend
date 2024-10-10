import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import {AuthProvider} from "./services/authState.jsx";
import {Charts} from "./components/DSH.jsx";

function App() {

    return (
        <>
            <AuthProvider>
                <Router>
                    <h1>Hello</h1>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Router>
            </AuthProvider>


        </>
    )
}

export default App
