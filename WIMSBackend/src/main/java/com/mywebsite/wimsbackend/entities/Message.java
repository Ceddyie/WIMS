package com.mywebsite.wimsbackend.entities;

import lombok.Data;

@Data
public class Message {
    private String productId;
    private int amount;
    private String storageLocation;
}
