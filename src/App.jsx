import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import {AuthProvider} from "./services/authState.jsx";

function App() {

    return (
        <>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Router>
            </AuthProvider>


        </>
    )
}

export default App
