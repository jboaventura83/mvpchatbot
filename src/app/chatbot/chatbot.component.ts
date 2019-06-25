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
  @ViewChild('txtMessage') txtMessage: any;
  mostraChat: boolean;

  constructor(private renderer: Renderer2, private chatbotService: AzurechatbotService) { }

  ngOnInit() {
    this.mostraChat = false;
    this.userMessage('oi');
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

  userMessage(message: string) {
    this.chatbotService.getAnswerFromAzureChatbot(message).subscribe((response: QnAResponse) => {
      console.log(JSON.stringify(response));
      response.answers.forEach(answer => {
        this.displayMessage(answer.answer, 'robot');
      });
    }, error => {
      console.error(error);
      this.displayMessage('Problemas ao enviar mensagem ao servidor. Você pode tentar novamente.', 'robot');
    });
  }

  novoEvento() {
    let userInput = this.txtMessage.nativeElement.value;
    console.log('userInput: ' + userInput);
    userInput = userInput.replace(/(\r\n|\n|\r)/gm, '');
    console.log('userInput: ' + userInput);
    if (userInput) {
        this.displayMessage(userInput, 'user');
        this.txtMessage.nativeElement.value = '';
        console.log('chamando o serviço: ' + userInput);
        this.userMessage(userInput);
    }
  }

}
