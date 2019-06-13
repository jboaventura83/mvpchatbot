//var isOpen = false;
//function popupToggle(){
//    var popup = document.getElementById("chat-popup");
//    if(isOpen){
//        popup.style.animationName = "popup_close";
//        isOpen = false;
//    }else{
//        popup.style.animationName = "popup_open";
//        isOpen = true;
//    }
//}

// JJ

$(document).ready(function () {
    var isOpen = false;
    $('.chat-header').click(function () {
        if (isOpen) {
            isOpen = false;
            $('.chat-popup').css({
                "animation-name": "popup_close"
            });
            $('.chat-body').css({
                "animation-name": "hide_chat"
            });
            $('.chat-footer').css({
                "animation-name": "hide_chat"
            });
        }
        else {
            isOpen = true;
            $('.chat-popup').css({
                "animation-name": "popup_open"
            });
            $('.chat-body').css({
                "animation-name": "show_chat"
            });
            $('.chat-footer').css({
                "animation-name": "show_chat"
            });
        }
    });
});


var params = {},
    watson = 'Azure';

function userMessage(message) {

    params.question = message;
    
    var xhr = new XMLHttpRequest();
    var uri = 'https://prodesp-qnamaker-chatbot.azurewebsites.net/qnamaker/knowledgebases/d55e512b-1de7-4558-8e11-53a3b400ebfa/generateAnswer';
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'EndpointKey 23cebdff-8b8f-4dab-bd71-b245d8371a83');
    xhr.onload = function () {
        // Verify if there is a success code response and some text was sent
        if (xhr.status === 200 && xhr.responseText) {
            var response = JSON.parse(xhr.responseText);
            text = response.answers; // Only display the first response
            context = response.context; // Store the context for next round of questions
            console.log("Got response from Azure: ", JSON.stringify(response));

            for (var txt in text) {
                displayMessage(text[txt].answer, watson);
            }

        }
        else {
            console.error('Server error for Conversation. Return status of: ', xhr.statusText);
            displayMessage("Putz, deu um tilt aqui. Você pode tentar novamente.", watson);
        }
    };
    xhr.onerror = function () {
        console.error('Network error trying to send message!');
        displayMessage("Ops, acho que meu cérebro está offline. Espera um minutinho para continuarmos por favor.", watson);
    };
    console.log(JSON.stringify(params));
    xhr.send(JSON.stringify(params));
}


function newEvent(event) {
    // Only check for a return/enter press - Event 13
    if (event.which === 13 || event.keyCode === 13) {
        var userInput = document.getElementById('chatInput');
        text = userInput.value; // Using text as a recurring variable through functions
        text = text.replace(/(\r\n|\n|\r)/gm, ""); // Remove erroneous characters
        // If there is any input then check if this is a claim step
        // Some claim steps are handled in newEvent and others are handled in userMessage
        if (text) {
            // Display the user's text in the chat box and null out input box
            //            userMessage(text);
            displayMessage(text, 'user');
            userInput.value = '';
            userMessage(text);
        }
        else {
            // Blank user message. Do nothing.
            console.error("No message.");
            userInput.value = '';
            return false;
        }
    }
}

function displayMessage(text, user) {
    var chat_body = document.getElementById('chat-body');
    var bubble = document.createElement('div');
    bubble.setAttribute("class", "bubble");
    if (user === "user") {
        bubble.className += " user";
    }
    else if (user === "guia") {
        bubble.className += " guia";
    }
    else{
        bubble.className += " watson";
    }
    bubble.innerHTML = text;
    chat_body.appendChild(bubble);
    chat_body.scrollTop = chat_body.scrollHeight;
}


userMessage('oi');
