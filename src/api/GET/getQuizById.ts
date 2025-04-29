import { Endpoints } from "../endpoints.ts";
import { Quiz } from "../../shared/types/Quiz.tsx";

export const getQuizById = async (quizId: string, accessToken: string) => {
  const quizResponse = await fetch(`${Endpoints.getQuizzes}/${quizId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (quizResponse.status === 404) {
    return null;
  } else if (!quizResponse.ok) {
    throw new Error("Failed to fetch quiz");
  }

  const quizData: Quiz = await quizResponse.json();
  return quizData;
};
