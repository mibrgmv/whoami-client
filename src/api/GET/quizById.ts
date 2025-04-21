import {Endpoints} from "../endpoints.ts";
import {Quiz} from "../../shared/types/Quiz.tsx";
import {LoginData} from "../../AuthContext.tsx";

export const getQuizById = async (quizId: string, loginData: LoginData) => {
    const quizResponse = await fetch(`${Endpoints.getQuizzes}/${quizId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    })
    if (quizResponse.status === 404) {
        return null;
    } else if (!quizResponse.ok) {
        throw new Error('Failed to fetch quiz');
    }
    const quizData: Quiz = await quizResponse.json();
    return quizData;
}