package com.mywebsite.wimsbackend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mywebsite.wimsbackend.entities.Orders;
import com.mywebsite.wimsbackend.entities.ShippedMessage;
import com.mywebsite.wimsbackend.entities.StorageAssignmentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {
    private static final String PRODUCT_SELECTION_TOPIC = "product_selection_1";
    private static final String STORAGE_ASSIGNMENT_TOPIC = "storage_assignment_1";
    private static final String TEST_TOPIC = "test_topic";
    private static final String SHIPPED_TOPIC = "shipped_order";
    long sentTestTimestamp;
    long sentTimestamp;
    long assignmentTimestamp;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private KafkaTemplate<String, Object> objectKafkaTemplate;

    @Autowired
    private KafkaTemplate<String, Long> longKafkaTemplate;

    public void sendProductSelectionEvent(String productId, int amount) {
        String message = productId + ":" + amount;
        kafkaTemplate.send(TEST_TOPIC, "Message sent");
        sentTestTimestamp = System.currentTimeMillis();
        kafkaTemplate.send(PRODUCT_SELECTION_TOPIC, message);
        sentTimestamp = System.currentTimeMillis();
    }

    public void sendStorageAssignmentEvent(StorageAssignmentRequest request) {
        objectKafkaTemplate.send(STORAGE_ASSIGNMENT_TOPIC, new StorageAssignmentRequest(request.getProductId(), request.getAmount()));
        assignmentTimestamp = System.currentTimeMillis();
    }

    public void sendSetShipped(long orderId) {
        System.out.println(String.format("##########\nProduced Order Id-> %s\n##########", orderId));
        ShippedMessage message = new ShippedMessage(orderId, System.currentTimeMillis());
        this.objectKafkaTemplate.send(SHIPPED_TOPIC, new ShippedMessage(orderId, System.currentTimeMillis()));
    }
}
