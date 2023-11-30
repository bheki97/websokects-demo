package com.bheki97.websockectsdemo.model;

import java.io.Serializable;

public class MsgName implements Serializable {

    private String sender;
    private String message;

    public MsgName() {

    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public MsgName(String sender) {
        this.sender = sender;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }


    @Override
    public String toString() {
        return "MsgName{" +
                "sender='" + sender + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
