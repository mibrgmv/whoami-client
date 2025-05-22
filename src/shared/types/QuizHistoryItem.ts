export interface QuizHistoryItem {
  id: string;
  userId: string;
  quizId: string;
  quizTitle?: string;
  quizResult: string;
  completedAt?: string;
}