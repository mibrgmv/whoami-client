export const Endpoints = {
  login: `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
  refresh: `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh`,
  quizzes: `${import.meta.env.VITE_BACKEND_URL}/api/v1/quizzes`,
  users: `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`,
  history: `${import.meta.env.VITE_BACKEND_URL}/api/v1/history`,
};
