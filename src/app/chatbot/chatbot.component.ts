import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AzurechatbotService } from '../_services/azurechatbot.service';
import { QnAResponse } from '../_models/qnaresponse';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  @ViewChild('chatIcon') chatIcon: any;
  @ViewChild('dvConversa') dvConversa: any;
  @ViewChild('dvConteudo') dvConteudo: any;
  mostraChat: boolean;

  constructor(private renderer: Renderer2, private chatbotService: AzurechatbotService) { }

  ngOnInit() {
    this.mostraChat = false;
    this.displayMessage('Olá sou o assistente...', 'robot');
    this.displayMessage('teste', 'user');
    this.chatbotService.getAnswerFromAzureChatbot('oi').subscribe((response: QnAResponse) => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }

  abreChat() {
    console.log('abreChat acionado');
    this.mostraChat = true;
    this.dvConversa.nativeElement.className =  'boxConversa bC-On';
  }

  fechaChat() {
    console.log('fechaChat acionado');
    this.mostraChat = false;
    this.dvConversa.nativeElement.className =  'boxConversa';
  }

  displayMessage(text: string, user: string) {
    const bubble: HTMLParagraphElement = this.renderer.createElement('p');
    bubble.className = 'linhaChat';

    if (user === 'user') {
        bubble.className += ' c-user';
    }

    bubble.innerHTML = text;

     this.renderer.appendChild(this.dvConteudo.nativeElement, bubble);
     this.dvConteudo.nativeElement.scrollTop = this.dvConteudo.nativeElement.scrollHeight;
  }

}
