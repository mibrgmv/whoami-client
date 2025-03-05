import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {PrivateRoute} from "./components/PrivateRoute.tsx";
import {Layout} from "./components/Layout.tsx";
import {Home} from "./pages/Home.tsx";
import {Login} from "./pages/Login.tsx";
import {Register} from "./pages/Register.tsx";
import {Profile} from "./pages/Profile.tsx";
import {Users} from "./pages/Users.tsx";
import {Quizzes} from "./pages/Quizzes.tsx";
import {Quiz} from "./pages/Quiz.tsx";

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/quizzes" element={<Quizzes/>}/>
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
                        <Route
                            path="/quiz/:id"
                            element={<Quiz/>}
                        />
                </Route>
            </Routes>
        </Router>
    );
}