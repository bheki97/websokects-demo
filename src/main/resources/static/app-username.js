const url = 'http://localhost:8080';
let stompClient;
let username,message,receiver;


function connect() {
    console.log("connecting to chat...")
    username = $("#username").val();
    console.log("log username: "+username)

    if(!username || username ===''){
        alert('Please enter the username')
    }else{
        let socket = new SockJS(url + '/gs-guide-websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log("connected to: " + frame);
            setConnected(true);
            stompClient.subscribe('/topic/greetings/'+username, function (response) {
                let data = JSON.parse(response.body);
                console.log(data)

                showGreeting(data.message);
            });
        });
    }



}

function sendName() {
    receiver = $("#receiver").val()
    message = $("#message").val()

    if(!receiver || !message || message === '' || receiver==='' ){
        alert('please the receiver and the message to send message')
    }


    stompClient.send('/app/chat/'+receiver, {}, JSON.stringify({
        message:  message}));
}
function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});

function setConnected(connected) {

    console.log(connected)
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



function disconnect() {
    stompClient.disconnect();
    setConnected(false);
    console.log("Disconnected");
}
