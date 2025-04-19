import {Question} from "../../shared/types/Question.tsx";
import {Endpoints} from "../endpoints.ts";
import {LoginResponse} from "../POST/login.ts";

interface Props {
    quizId: string
    loginData: LoginResponse
    pageSize: number
    pageToken: string
}

export interface GetQuestionsByQuizIdResponse {
    questions: Question[]
    nextPageToken: string;
}

export const getQuestionsByQuizId = async (props: Props) => {
    let url = `${Endpoints.getQuizzes}/${props.quizId}/questions?page_size=${props.pageSize}`;
    if (props.pageToken) {
        url += `&page_token=${props.pageToken}`;
    }

    const questionsResponse = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${props.loginData.token}`,
        },
    })
    if (!questionsResponse.ok) {
        throw new Error('Failed to fetch questions for a quiz');
    } else {
        const questionsData: GetQuestionsByQuizIdResponse = await questionsResponse.json();
        return questionsData
    }
}