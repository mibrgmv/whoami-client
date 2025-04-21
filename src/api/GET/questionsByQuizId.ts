import {Question} from "../../shared/types/Question.tsx";
import {Endpoints} from "../endpoints.ts";
import {LoginData} from "../../AuthContext.tsx";

interface Props {
    quizId: string
    loginData: LoginData
    pageSize: number
    pageToken: string
}

export interface GetQuestionsByQuizIdResponse {
    questions: Question[]
    nextPageToken: string;
}

export const getQuestionsByQuizId = async ({quizId, loginData, pageSize, pageToken}: Props) => {
    let url = `${Endpoints.getQuizzes}/${quizId}/questions?page_size=${pageSize}`;
    if (pageToken) {
        url += `&page_token=${pageToken}`;
    }

    const questionsResponse = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    })
    if (!questionsResponse.ok) {
        throw new Error('Failed to fetch questions for a quiz');
    } else {
        const questionsData: GetQuestionsByQuizIdResponse = await questionsResponse.json();
        return questionsData
    }
}