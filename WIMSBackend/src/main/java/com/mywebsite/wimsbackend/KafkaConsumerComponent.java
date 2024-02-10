package com.mywebsite.wimsbackend;

import org.apache.kafka.clients.consumer.KafkaConsumer;
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

    @KafkaListener(topics = "product_selection_2")
    public void listen(String message) {
        System.out.println(message);

        this.messagingTemplate.convertAndSend("/topic/productSelection", message);
    }

}
