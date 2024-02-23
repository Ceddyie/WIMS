package com.mywebsite.wimsbackend.entities.responses;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.query.Order;


@Data
@Table
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long orderDate;

    @Column
    private Long customerId;

    @Column
    private String productId;

    @Column
    private int amount;

    @Column
    private double totalCost;

    @Column
    private boolean shipped;

    private long timestamp;

    public Orders(){}

    public Orders(Long id, Long orderDate, Long customerId, String productId, int amount, double totalCost, boolean shipped) {
        this.id = id;
        this.orderDate = orderDate;
        this.customerId = customerId;
        this.productId = productId;
        this.amount = amount;
        this.totalCost = totalCost;
        this.shipped = shipped;
    }

    public Orders(Long orderDate, Long customerId, String productId, int amount, double totalCost, boolean shipped) {
        this.orderDate = orderDate;
        this.customerId = customerId;
        this.productId = productId;
        this.amount = amount;
        this.totalCost = totalCost;
        this.shipped = shipped;
    }

    public Orders (Long id, boolean shipped) {
        this.id = id;
        this.shipped = shipped;
    }
}
