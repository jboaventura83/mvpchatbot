import { Answer } from './answer';

export interface QnAResponse {
    answers: Answer[];
    debugInfo?: any;
}
