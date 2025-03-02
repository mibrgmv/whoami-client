import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Home from './components/pages/Home.tsx';
import Profile from './components/pages/Profile.tsx';
import Login from './components/pages/Login.tsx';
import Users from "./components/pages/Users.tsx";
import { useAuth } from './context/AuthContext';
import Layout from "./components/Layout.tsx";
import Register from "./components/pages/Register.tsx";

function App() {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route element={user ? <Outlet /> : <Navigate to="/login" />}>
                        <Route
                            path="/profile"
                            element={<Profile />}
                        />
                        <Route
                            path="/users"
                            element={<Users />}
                        />
                    </Route>
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/" /> : <Login />}
                    />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;