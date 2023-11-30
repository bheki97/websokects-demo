const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/space'
});
let userName;
let receiver;

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe("/topic/messages/" + userName, (greeting) => {
        console.log(greeting)
        showGreeting(JSON.parse(greeting.body).name);
    });
    stompClient.subscribe("/topic/messages/" + userName, (greeting) => {
        console.log(greeting)
        showGreeting(JSON.parse(greeting.body).name);
    });

};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.publish({
        destination: `/app/chat/${receiver}`,
        body: JSON.stringify({'name': $("#name").val()})
    });
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => {
        const name = document.getElementById("userName");
        const name1 = document.getElementById("receivers");

        if (name && name1 && (userName = name.value) !== '' && (receiver = name1.value) !== '') {
            alert(`Your name is ${userName}`)
            connect()
        } else {
            alert("Please Enter name")

        }

    });
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});