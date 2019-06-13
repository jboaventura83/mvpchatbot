import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

/**
 * Declares the WebChat property on the window object.
 */
declare global {
    interface Window {
        WebChat: any;
    }
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  @ViewChild('botWindow') botWindowElement: ElementRef;

  constructor() { }

  ngOnInit() {
    const directLine = window.WebChat.createDirectLine({
        secret: 'THQq-_c64qU.rQUxpXbK5jE4p1wk-9Y7vCgEAe1ideOlfd2R975_r3s',
        webSocket: false
    });

    window.WebChat.renderWebChat(
        {
            directLine: directLine,
            userID: 'USER_ID'
        },
        this.botWindowElement.nativeElement
    );

    directLine
        .postActivity({
            from: { id: 'USER_ID', name: 'USER_NAME' },
            name: 'requestWelcomeDialog',
            type: 'event',
            value: 'token'
        })
        .subscribe(
            id => console.log(`Posted activity, assigned ID ${id}`),
            error => console.log(`Error posting activity ${error}`)
        );
  }

}
