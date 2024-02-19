package com.mywebsite.wimsbackend.requests;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
