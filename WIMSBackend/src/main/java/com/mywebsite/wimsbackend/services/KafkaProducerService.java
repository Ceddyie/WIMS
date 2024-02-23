package com.mywebsite.wimsbackend.services;

import com.mywebsite.wimsbackend.entities.requests.ProductSelectionRequest;
import com.mywebsite.wimsbackend.entities.requests.ShippedMessage;
import com.mywebsite.wimsbackend.entities.requests.StorageAssignmentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {
    private static final String PRODUCT_SELECTION_TOPIC = "product_selection_1";
    private static final String STORAGE_ASSIGNMENT_TOPIC = "storage_assignment_1";
    private static final String SHIPPED_TOPIC = "shipped_order";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private KafkaTemplate<String, Object> objectKafkaTemplate;

    public void sendProductSelectionEvent(String productId, int amount) {
        objectKafkaTemplate.send(PRODUCT_SELECTION_TOPIC, new ProductSelectionRequest(productId, amount, System.currentTimeMillis()));
    }

    public void sendStorageAssignmentEvent(StorageAssignmentRequest request) {
        objectKafkaTemplate.send(STORAGE_ASSIGNMENT_TOPIC, new StorageAssignmentRequest(request.getProductId(), request.getAmount(), System.currentTimeMillis()));
    }

    public void sendSetShipped(long orderId) {
        System.out.println(String.format("##########\nProduced Order Id-> %s\n##########", orderId));
        this.objectKafkaTemplate.send(SHIPPED_TOPIC, new ShippedMessage(orderId, System.currentTimeMillis()));
    }
}
