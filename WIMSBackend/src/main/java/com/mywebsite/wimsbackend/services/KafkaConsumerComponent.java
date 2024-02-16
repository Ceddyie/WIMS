package com.mywebsite.wimsbackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

@Component
@CrossOrigin(origins = "http://localhost:4200")
public class KafkaConsumerComponent {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private KafkaProducerService producer;

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
}
