package com.mywebsite.wimsbackend.services.KafkaServices;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mywebsite.wimsbackend.controller.WarehouseController;
import com.mywebsite.wimsbackend.entities.responses.Assigned;
import com.mywebsite.wimsbackend.entities.responses.Message;
import com.mywebsite.wimsbackend.entities.responses.Orders;
import com.mywebsite.wimsbackend.entities.responses.ProductLocation;
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

    @Autowired
    private ObjectMapper objectMapper;

    ///////////////// PRODUCT SELECTION /////////////////

    @KafkaListener(topics = "product_selection_2")
    public void listen(String message) {
        try {
            ProductLocation productLocation = objectMapper.readValue(message, ProductLocation.class);
            long measureTime = System.currentTimeMillis() - productLocation.getTimestamp();
            System.out.println("Operation took " + measureTime + " ms");
            String frontendMessage = "ProductID: " + productLocation.getProductId() +
                    "\nAmount: " + productLocation.getAmount() +
                    "\nStorage Location: " + productLocation.getStorageLocation();
            System.out.println("Message: " + frontendMessage);
            this.messagingTemplate.convertAndSend("/topic/productSelection", frontendMessage);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    @KafkaListener(topics = "product_selection_error")
    public void listenError(String message) {
        try {
            Message messageObject = objectMapper.readValue(message, Message.class);
            long measureTime = System.currentTimeMillis() - messageObject.getTimestamp();
            System.out.println("Operation took " + measureTime + " ms");
            String frontendMessage = messageObject.getMessage();
            this.messagingTemplate.convertAndSend("/topic/productSelection", frontendMessage);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    ///////////////// STORAGE ASSIGNMENT //////////////////

    @KafkaListener(topics = "storage_assignment_2")
    public void receive(String message) {
        try {
            Assigned assigned = objectMapper.readValue(message, Assigned.class);
            long measureTime =  System.currentTimeMillis() - assigned.getTimestamp();
            System.out.println("Operation took " + measureTime + " ms");
            String frontendMessage;
            if (assigned.getAmount() == 0) {
                frontendMessage = "ProductID: " + assigned.getProductId() + ", Storage Location: " + assigned.getStorageLocation();
            } else {
                frontendMessage = "ProductID: " + assigned.getProductId() + ", Amount: " + assigned.getAmount() + ", Storage Location: " + assigned.getStorageLocation();
            }
            this.messagingTemplate.convertAndSend("/topic/storageAssignment", frontendMessage);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
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
