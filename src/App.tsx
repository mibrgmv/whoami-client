import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {PrivateRoute} from "./components/PrivateRoute.tsx";
import {Layout} from "./components/Layout.tsx";
import {HomePage} from "./pages/Home.tsx";
import {LoginPage} from "./pages/Login.tsx";
import {Register} from "./pages/Register.tsx";
import {ProfilePage} from "./pages/Profile.tsx";
import {Users} from "./pages/Users.tsx";
import {Quizzes} from "./pages/Quizzes.tsx";
import {QuizPage} from "./pages/Quiz.tsx";

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/quizzes" element={<Quizzes/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route
                            path="/profile"
                            element={<ProfilePage/>}
                        />
                        <Route
                            path="/users"
                            element={<Users/>}
                        />
                        <Route
                            path="/quizzes/:quizId"
                            element={<QuizPage/>}
                        />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}