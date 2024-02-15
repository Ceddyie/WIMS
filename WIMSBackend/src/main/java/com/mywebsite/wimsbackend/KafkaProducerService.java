package com.mywebsite.wimsbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {
    private static final String PRODUCT_SELECTION_TOPIC = "product_selection_1";
    private static final String STORAGE_ASSIGNMENT_TOPIC = "storage_assignment_1";
    private static final String TEST_TOPIC = "test_topic";
    long sentTestTimestamp;
    long sentTimestamp;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendProductSelectionEvent(String productId, int amount) {
        String message = productId + ":" + amount;
        kafkaTemplate.send(TEST_TOPIC, "Message sent");
        sentTestTimestamp = System.currentTimeMillis();
        kafkaTemplate.send(PRODUCT_SELECTION_TOPIC, message);
        sentTimestamp = System.currentTimeMillis();
    }

    public void sendStorageAssignmentEvent(String productId, int amount) {
        String message = productId + ":" + amount;
        kafkaTemplate.send(STORAGE_ASSIGNMENT_TOPIC, message);
    }
}
