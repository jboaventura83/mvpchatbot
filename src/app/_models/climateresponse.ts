import { ClimateData } from './climatedata';

export interface ClimateResponse {
    id: number;
    name: string;
    state: string;
    country: string;
    data: ClimateData;
}