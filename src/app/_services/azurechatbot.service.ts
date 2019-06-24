import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QnAResponse } from '../_models/qnaresponse';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'EndpointKey 23cebdff-8b8f-4dab-bd71-b245d8371a83',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AzurechatbotService {

  constructor(private http: HttpClient) { }

  getAnswerFromAzureChatbot(message): Observable<QnAResponse> {
    const body = {
      question: ''
    };
    body.question = message;
// tslint:disable-next-line: max-line-length
    return this.http.post<QnAResponse>('https://prodesp-qnamaker-chatbot.azurewebsites.net/qnamaker/knowledgebases/d55e512b-1de7-4558-8e11-53a3b400ebfa/generateAnswer', body, {
        headers: new HttpHeaders({
        'Authorization': 'EndpointKey 23cebdff-8b8f-4dab-bd71-b245d8371a83'})
        });
  }

}
