import { Context } from './context';

export interface Answer {
    questions: string[];
    answer: string;
    score: number;
    id: number;
    source: string;
    metadata: any[];
    context: Context;
}
