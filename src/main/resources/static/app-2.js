const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/space'
});
let userName;

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/greetings', (greeting) => {
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
function connect() {
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log("connected to: " + frame);
        stompClient.subscribe("/topic/messages/" + userName, function (response) {
            showGreeting(JSON.parse(response.body).name);
        });
    });
}

function disconnect() {
    stompClient._destroy()
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    var txt = $("#name").val();


    stompClient.publish({
        destination: `/app/chat/${receiver}`,
        body: {'message': txt,'sender':userName}
    });

}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => {
        const username = document.getElementById("userName");
        const receiverName = document.getElementById("userName");
        if (username && receiverName && (userName = username.value) !== '' && (receiver = receiverName.value) !== '') {
            alert(`Your name is ${userName}`)
            connect()
        } else {
            alert("Please Enter name")

        }

    });
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});