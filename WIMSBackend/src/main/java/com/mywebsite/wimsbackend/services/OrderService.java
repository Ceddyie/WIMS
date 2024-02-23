package com.mywebsite.wimsbackend.services;

import com.mywebsite.wimsbackend.entities.responses.Orders;
import com.mywebsite.wimsbackend.services.KafkaServices.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    private KafkaProducerService producerService;

    public void saveOrder(Orders orders) {
        MapSqlParameterSource namedParameters = new MapSqlParameterSource();
        namedParameters.addValue("order_date", orders.getOrderDate());
        namedParameters.addValue("customer_id", orders.getCustomerId());
        namedParameters.addValue("product_id", orders.getProductId());
        namedParameters.addValue("amount", orders.getAmount());
        namedParameters.addValue("total_cost", orders.getTotalCost());
        namedParameters.addValue("shipped", orders.isShipped());

        jdbcTemplate.update("INSERT INTO orders(order_date, customer_id, product_id, amount, total_cost, shipped) VALUES (:order_date, :customer_id, :product_id, :amount, :total_cost, :shipped)", namedParameters);
    }

    public List<Orders> getOrders() {
        return jdbcTemplate.query("SELECT * FROM orders", new BeanPropertyRowMapper<>(Orders.class));
    }

    public ResponseEntity<Orders> setShipped(long orderId) {
        MapSqlParameterSource namedParameters = new MapSqlParameterSource();
        namedParameters.addValue("order_id", orderId);

        producerService.sendSetShipped(orderId);
        jdbcTemplate.update("UPDATE orders SET shipped = true WHERE id = :order_id", namedParameters);
        return new ResponseEntity<Orders>(HttpStatus.OK);
    }
}
