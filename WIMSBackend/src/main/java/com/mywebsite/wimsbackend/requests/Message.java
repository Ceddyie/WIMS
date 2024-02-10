package com.mywebsite.wimsbackend.requests;

import lombok.Data;

@Data
public class Message {
    private String productId;
    private int amount;
    private String storageLocation;
}
