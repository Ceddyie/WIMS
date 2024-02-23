package com.mywebsite.wimsbackend.entities.requests;

import lombok.Data;

@Data
public class StorageAssignmentRequest {
    private String productId;

    private int amount;

    private long timestamp;

    public StorageAssignmentRequest() {}

    public StorageAssignmentRequest(String productId, int amount, long timestamp) {
        this.productId = productId;
        this.amount = amount;
        this.timestamp = timestamp;
    }

}
