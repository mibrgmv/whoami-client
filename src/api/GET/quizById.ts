import {Endpoints} from "../endpoints.ts";
import {Quiz} from "../../shared/types/Quiz.tsx";
import {LoginResponse} from "../POST/login.ts";

export const getQuizById = async (quizId: string, loginData: LoginResponse) => {
    const quizResponse = await fetch(`${Endpoints.getQuizzes}/${quizId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    })
    if (!quizResponse.ok) {
        throw new Error('Failed to fetch quiz');
    }
    const quizData: Quiz = await quizResponse.json();
    return quizData;
}