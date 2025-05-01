export const Endpoints = {
  login: `${import.meta.env.VITE_BACKEND_URL}/api/v1/login`,
  register: `${import.meta.env.VITE_BACKEND_URL}/api/v1/register`,
  refreshToken: `${import.meta.env.VITE_BACKEND_URL}/api/v1/refresh`,
  users: `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`,
  quizzes: `${import.meta.env.VITE_BACKEND_URL}/api/v1/quizzes`,
  uploadQuizImage: `${import.meta.env.VITE_BACKEND_URL}/api/v1/quizzes/upload-image`,
};
