package com.mywebsite.wimsbackend.entities.requests;

import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.Data;

@Data
public class ProductSelectionRequest {
    private String productId;

    private int amount;

    private long timestamp;

    public ProductSelectionRequest() {

    }

    public ProductSelectionRequest(String productId, int amount, long timestamp) {
        this.productId = productId;
        this.amount = amount;
        this.timestamp = timestamp;
    }
}
