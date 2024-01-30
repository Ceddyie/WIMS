package com.mywebsite.wimsbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {
    private static final String PRODUCT_SELECTION_TOPIC = "product_selection_topic";
    private static final String STORAGE_ASSIGNMENT_TOPIC = "storage_assignment_topic";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendProductSelectionEvent(String productId, int amount) {
        String message = productId + ":" + amount;
        kafkaTemplate.send(PRODUCT_SELECTION_TOPIC, message);
    }

    public void sendStorageAssignmentEvent(String storageLocation, String productDetails) {
        String message = "Storage assignment for " + productDetails + " at location: " +storageLocation;
        kafkaTemplate.send(STORAGE_ASSIGNMENT_TOPIC, message);
    }
}
