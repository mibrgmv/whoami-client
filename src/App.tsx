import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {PrivateRoute} from "./components/PrivateRoute";
import {Layout} from "./components/Layout";
import {HomePage} from "./pages/Home";
import {LoginPage} from "./pages/Login";
import {RegisterPage} from "./pages/Register";
import {ProfilePage} from "./pages/Profile";
import {Users} from "./pages/Users";
import {Quizzes} from "./pages/Quizzes";
import {QuizPage} from "./pages/Quiz";

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/quizzes" element={<Quizzes/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/users" element={<Users/>}/>
                        <Route path="/quizzes/:quizId" element={<QuizPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}