const userMessage = document.getElementById("user_message");
const messageHistory = document.getElementById("message_history");
const chatBox = document.getElementById("chat_box");
let roleName = "Katherine Johnson";
let roleDesc = "NASA mathematician";

document
    .getElementById("user_message_form")
    .addEventListener("submit", function (event) {
        // prevent submission of form
        event.preventDefault();

        let messageDiv = document.createElement("div");
        messageDiv.className = "card my-4 ms-5 me-1";
        messageDiv.innerHTML = `<div class="card-body text-dark bg-light chat-card">${userMessage.value}</div>`;
        chatBox.appendChild(messageDiv);

        // build messageData object
        let messageData = {
            userMessage: userMessage.value,
            messageHistory: messageHistory.value,
        };

        // build JSON request to send to server
        let jsonRequest = {
            cache: "no-cache",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(messageData),
        };
        
        // add message to history and empty input box
        messageHistory.value += `|user: ${userMessage.value}`;
        userMessage.value = "";

        // send fetch request to server
        fetch(fetchURL, jsonRequest)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let aiMessage = data["message"];
                console.log("POST data:");
                console.log(aiMessage);

                // add response to chatbox
                let replyDiv = document.createElement("div");
                replyDiv.className = "card my-4 ms-1 me-5";
                replyDiv.innerHTML = `<div class="card-body text-dark bg-reply chat-card">${aiMessage}</div>`;
                chatBox.appendChild(replyDiv);

                // append reply to message history
                messageHistory.value += `|assistant: ${aiMessage}`;
            });
    });

const choiceObjects = [
    {
        name: "Catherine Johnson",
        occupation: "NASA mathematician",
    },
    {
        name: "Ada Lovelace",
        occupation: "mathematician", 
    },
    {
        name: "test one",
        occupation: "mathematician", 
    },
    {
        name: "Catherine Johnson",
        occupation: "mathematician", 
    },
    {
        name: "Catherine Johnson",
        occupation: "mathematician", 
    }]
    
    var personAnounce = document.getElementById("pers-info");
    function personInfo(person) {
        personAnounce.innerHTML = `Hi! I am ${person.occupation} ${person.name}. Ask me anything!`;
    }

document.getElementById('chat_selector').addEventListener('click', function (e) {
    roleName = e.target.dataset.name;
    roleDesc = e.target.dataset.desc;
})