package com.mywebsite.wimsbackend.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mywebsite.wimsbackend.controller.WarehouseController;
import com.mywebsite.wimsbackend.entities.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;

@Component
@CrossOrigin(origins = "http://localhost:4200")
public class KafkaConsumerComponent {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private KafkaProducerService producer;

    @Autowired
    private WarehouseController warehouseController;

    @KafkaListener(topics = "test_topic")
    public void listenTest(String message) {
        long receivedTimestamp = System.currentTimeMillis();
        long elapsedTime = receivedTimestamp - producer.sentTestTimestamp;
        System.out.println("Received message " + message + " in " + elapsedTime + " ms");
    }

    @KafkaListener(topics = "product_selection_2")
    public void listen(String message) {
        long receivedTimestamp = System.currentTimeMillis();
        long elapsed = receivedTimestamp - producer.sentTimestamp;
        System.out.println(message + " | Operation took " + elapsed + " ms");

        this.messagingTemplate.convertAndSend("/topic/productSelection", message);
    }

    @KafkaListener(topics = "storage_assignment_2")
    public void receive(String message) {
        System.out.println(message);
        this.messagingTemplate.convertAndSend("/topic/storageAssignment", message);
    }

    @KafkaListener(topics = "order_topic")
    public void receiveOrder(String orderString) throws IOException {
        System.out.println(String.format("##########\nConsumed Order-> %s\n##########", orderString));
        ObjectMapper mapper = new ObjectMapper();
        Orders orders = mapper.readValue(orderString, Orders.class);
        long measureTime = System.currentTimeMillis() - orders.getTimestamp();
        System.out.println("Measure time: " + measureTime);
        warehouseController.saveOrder(orders);
    }
}
