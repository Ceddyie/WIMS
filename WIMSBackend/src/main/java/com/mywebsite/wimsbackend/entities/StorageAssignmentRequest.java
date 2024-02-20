package com.mywebsite.wimsbackend.entities;

import lombok.Data;

@Data
public class StorageAssignmentRequest {
    private String productId;

    private int amount;

    public StorageAssignmentRequest() {}

    public StorageAssignmentRequest(String productId, int amount) {
        this.productId = productId;
        this.amount = amount;
    }

}
