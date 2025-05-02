import { Endpoints } from "../endpoints.ts";

interface QuestionResponse {
  id: string;
  quiz_id: string;
  body: string;
  options: string[];
}

interface GetQuestionsByQuizIdResponse {
  questions: QuestionResponse[];
}

export const getQuestionsByQuizId = async (
  quizId: string,
  fetch: (url: string, options: RequestInit) => Promise<Response>,
): Promise<GetQuestionsByQuizIdResponse> => {
  const url = `${Endpoints.quizzes}/${quizId}/questions`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch questions for quiz: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as GetQuestionsByQuizIdResponse;

  return {
    questions: data.questions.map((question) => ({
      id: question.id,
      quiz_id: question.quiz_id,
      body: question.body,
      options: question.options,
    })),
  };
};
