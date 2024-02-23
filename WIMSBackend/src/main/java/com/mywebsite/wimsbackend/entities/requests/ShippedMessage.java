package com.mywebsite.wimsbackend.entities.requests;

import lombok.Data;

@Data
public class ShippedMessage {
    private long orderId;
    private long timestamp;

    public ShippedMessage(long orderId, long timestamp) {
        this.orderId = orderId;
        this.timestamp = timestamp;
    }
}
