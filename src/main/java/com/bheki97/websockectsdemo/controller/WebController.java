package com.bheki97.websockectsdemo.controller;


import com.bheki97.socketsdemo.model.MsgName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Message greeting(Message message) throws Exception {
        Thread.sleep(500); // simulated delay
        return new Message(message.getMessage());
    }

    @MessageMapping("/chat/{username}")
    public void handleChatMessage(@DestinationVariable String username, MsgName message) {
        // Process the message, e.g., save it to a database

        // Send the message to the specific user's destination
        messagingTemplate.convertAndSend("/topic/greetings/"+username, message);


//        messagingTemplate.convertAndSend( "/topic/greetings", message.getName());

//        System.out.println(messagingTemplate.getDefaultDestination());

//        messagingTemplate.setDefaultDestination("/topic/"+username+"/queue/chat");
//        System.out.println(messagingTemplate.getDefaultDestination());
//        messagingTemplate.convertAndSend(message.getName());

    }


    private static class  Message {
        private String message;


        public Message() {
        }

        public Message(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        @Override
        public String toString() {
            return "Message{" +
                    "message='" + message + '\'' +
                    '}';
        }
    }

}
