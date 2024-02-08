package com.mywebsite.wimsbackend;

import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumerComponent {
    public static final String ERROR_MESSAGE = "Error! Please check the information you entered.";

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    String kafkaSelectionMessage;

    @KafkaListener(topics = "product_selection_2")
    public void listen(String message) {
        System.out.println(message);

        /*if (!message.contains("Error")) {
            String[] split = message.split(":");
            String productId = split[0].replace("\"", "");
            System.out.println("ProductID: " + productId);
            String amount = (split[1].replace("\"", ""));
            System.out.println("Amount: " + amount);
            String storageLocation = split[2].replace("\"", "");
            System.out.println("Storage Location: " + storageLocation);

            return "Product with ID " + productId + " and amount " + amount + " is stored in: " + storageLocation;
        }
        else {
            return ERROR_MESSAGE;
        }*/


        kafkaSelectionMessage = message;

        System.out.println(getKafkaSelectionMessage());

        this.messagingTemplate.convertAndSend("/topic/productSelection", getKafkaSelectionMessage());
    }

    public String getKafkaSelectionMessage() {
        if (!kafkaSelectionMessage.contains("Error")) {
            String[] split = kafkaSelectionMessage.split(":");
            String productId = split[0].replace("\"", "");
            System.out.println("ProductID: " + productId);
            int amount = Integer.parseInt(split[1].replace("\"", ""));
            System.out.println("Amount: " + amount);
            String storageLocation = split[2].replace("\"", "");
            System.out.println("Storage Location: " + storageLocation);

            return "Product with ID " + productId + " and amount " + amount + " is stored in: " + storageLocation;
        }
        else {
            return ERROR_MESSAGE;
        }
    }
}
