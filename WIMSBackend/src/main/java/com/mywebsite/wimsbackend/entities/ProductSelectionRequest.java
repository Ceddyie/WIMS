package com.mywebsite.wimsbackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "product")
public class ProductSelectionRequest {

    @Column
    private String productId;

    @Column
    private String productName;

    @Column
    private String imageUrl;

    @Column
    private double price;

    @Column
    private int amount;

    public ProductSelectionRequest() {

    }

    public ProductSelectionRequest(String productId, int amount) {
        this.productId = productId;
        this.amount = amount;
    }
}
