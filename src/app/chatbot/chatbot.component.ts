import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AzurechatbotService } from '../_services/azurechatbot.service';
import { QnAResponse } from '../_models/qnaresponse';
import { ClimatempoService } from '../_services/climatempo.service';
import { ClimateResponse } from '../_models/climateresponse';


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

  constructor(private renderer: Renderer2, private chatbotService: AzurechatbotService,
              private climatempoService: ClimatempoService) { }

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
        if (answer.answer === '[CLIMATEMPO]') {
          this.displayMessage('Consultando dados de clima em API externa... um momento..', 'robot');

          this.climatempoService.getClimateDataFromClimatempo().subscribe((responseFromClimatempo: ClimateResponse) => {
            console.log(JSON.stringify(responseFromClimatempo));
            this.displayMessage('A temperatura atual em São Paulo é de ' + responseFromClimatempo.data.temperature +
                              ' graus C, sensação térmica de ' + responseFromClimatempo.data.sensation +
                              ' graus C e as condições são de ' + responseFromClimatempo.data.condition, 'robot');
          }, error => {
            console.error(error);
            this.displayMessage('Problemas ao enviar/receber dados de clima', 'robot');
          });

        } else {
          this.displayMessage(answer.answer, 'robot');
        }
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
