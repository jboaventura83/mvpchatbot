import { Prompt } from './prompt';

    export interface Context {
        isContextOnly: boolean;
        prompts: Prompt[];
    }