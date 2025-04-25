import {Endpoints} from "../endpoints.ts";
import {Answer} from "../../shared/types/Answer.tsx";
import {LoginData} from "../../AuthContext.tsx";

interface EvaluateRequest {
    quizId: string
    answers: Answer[]
    loginData: LoginData
}

interface EvaluateResponse {
    result: string
}

export const evaluate = async ({quizId, answers, loginData}: EvaluateRequest) => {
    const url = `${Endpoints.getQuizzes}/${quizId}/evaluate`;

    const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${loginData.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                answers: answers,
                quiz_id: quizId
            })
        }
    );

    if (!response.ok) {
        throw new Error('Failed to submit answers');
    }

    const data: EvaluateResponse = await response.json();
    return data;
}