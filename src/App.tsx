import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  CreateQuiz,
  HistoryPage,
  HomePage,
  Layout,
  LoginPage,
  PrivateRoute,
  ProfilePage,
  QuizPage,
  Quizzes,
  RegisterPage,
  Users,
} from "./components";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/quizzes/create" element={<CreateQuiz />} />
            <Route path="/quizzes/:quizId" element={<QuizPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
