package com.mywebsite.wimsbackend.entities.responses;

import lombok.Data;

@Data
public class Assigned {
    private String productId;
    private int storageLocation;
    private int amount;
    private long timestamp;
}
