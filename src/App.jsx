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
                <h1 className="bg-slate-800 text-xl text-white w-full p-6">Made by <a href="https://github.com/brentcenci" target="_blank">Brent Cenci</a></h1>
            </AuthProvider>


        </>
    )
}

export default App
