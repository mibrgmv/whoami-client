import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home.tsx';
import Profile from './components/pages/Profile.tsx';
import Login from './components/pages/Login.tsx';
import Users from "./components/pages/Users.tsx";
import Layout from "./components/Layout.tsx";
import Register from "./components/pages/Register.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route
                            path="/profile"
                            element={<Profile/>}
                        />
                        <Route
                            path="/users"
                            element={<Users/>}
                        />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;