import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClimateResponse } from '../_models/climateresponse';


@Injectable({
  providedIn: 'root'
})
export class ClimatempoService {

  constructor(private http: HttpClient) { }

  getClimateDataFromClimatempo(): Observable<ClimateResponse> {
// tslint:disable-next-line: max-line-length
    return this.http.get<ClimateResponse>('http://apiadvisor.climatempo.com.br/api/v1/weather/locale/3477/current?token=9d8aa8bcfef065627332b86048458162');
  }

}
