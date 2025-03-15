export interface Question {
    id: bigint;
    quiz_id: bigint;
    body: string;
    options: string[];
}