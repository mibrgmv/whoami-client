import {Quiz} from "../shared/types/Quiz.tsx";
import {Endpoints} from "./endpoints.ts";

export const getQuizzes = async () => {
    const response = await fetch(Endpoints.getQuizzes, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch quizzes');
    }
    const data: Quiz[] = await response.json();
    return data;
}