import {Endpoints} from "../endpoints.ts";
import {Quiz} from "../../shared/types/Quiz.tsx";

export interface GetQuizzesResponse {
    quizzes: Quiz[];
    nextPageToken: string;
}

export const getQuizzes = async (pageSize: number, pageToken: string): Promise<GetQuizzesResponse> => {
    let url = `${Endpoints.getQuizzes}?page_size=${pageSize}`;
    if (pageToken) {
        url += `&page_token=${pageToken}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch quizzes');
    }
    return await response.json();
};