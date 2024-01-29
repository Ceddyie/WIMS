package com.mywebsite.wimsbackend.requests;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class ProductSelectionRequest {

    @Id
    @Column
    private String productId;

    @Column
    private String productName;

    @Column
    private String storageLocation;

    @Column
    private int amount;

    public ProductSelectionRequest() {

    }

    public ProductSelectionRequest(String productId, String storageLocation, int amount) {
        this.productId = productId;
        this.storageLocation = storageLocation;
        this.amount = amount;
    }
}
