package com.mywebsite.wimsbackend.entities.responses;

import lombok.Data;

@Data
public class Message {
    private String message;
    private long timestamp;
}
