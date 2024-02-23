package com.mywebsite.wimsbackend.entities.responses;

import lombok.Data;

@Data
public class ProductLocation {
    private String productId;
    private int amount;
    private int storageLocation;
    private long timestamp;
}
