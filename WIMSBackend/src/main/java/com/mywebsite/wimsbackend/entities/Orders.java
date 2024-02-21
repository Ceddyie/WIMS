package com.mywebsite.wimsbackend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
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
    private String address;

    @Column
    private boolean shipped;
}
