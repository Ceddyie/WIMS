package com.mywebsite.wimsbackend;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumerComponent {
    @KafkaListener(topics = "product_selection_2")
    public void listen(String message) {
        System.out.println(message);
//        if (!message.contains("Error")) {
//
//        }
    }
}
