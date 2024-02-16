package com.mywebsite.wimsbackend.services;

import com.mywebsite.wimsbackend.requests.StorageAssignmentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public ResponseEntity<StorageAssignmentRequest> sendStorageAssignmentEvent(StorageAssignmentRequest request) {
        String message = String.valueOf(request);
        kafkaTemplate.send(STORAGE_ASSIGNMENT_TOPIC, message);
        return new ResponseEntity<StorageAssignmentRequest>(HttpStatus.OK);
    }
}
