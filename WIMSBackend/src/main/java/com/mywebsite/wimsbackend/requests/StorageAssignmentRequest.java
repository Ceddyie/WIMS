package com.mywebsite.wimsbackend.requests;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "storageAssignment")
public class StorageAssignmentRequest {
    @Id
    @Column
    private String storageLocation;

    @Column
    private String productId;

    @Column
    private int amount;

    public StorageAssignmentRequest() {}

    public StorageAssignmentRequest(String storageLocation, String productId) {
        this.storageLocation = storageLocation;
        this.productId = productId;
    }

}
