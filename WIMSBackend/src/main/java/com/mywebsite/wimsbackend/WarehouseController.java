package com.mywebsite.wimsbackend;

import com.mywebsite.wimsbackend.KafkaConsumerComponent;
import com.mywebsite.wimsbackend.KafkaProducerService;
import com.mywebsite.wimsbackend.requests.ProductSelectionRequest;
import com.mywebsite.wimsbackend.requests.StorageAssignmentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/warehouse")
@CrossOrigin
public class WarehouseController {
    @Autowired
    private KafkaProducerService kafkaProducerService;

    @Autowired
    private KafkaConsumerComponent kafkaConsumerComponent;

    @PostMapping("/selectProduct")
    public ResponseEntity<Map<String, String>> selectProduct(@RequestBody ProductSelectionRequest request) {
        kafkaProducerService.sendProductSelectionEvent(request.getProductId(), request.getAmount());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Product selected successfully!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/assignStorage")
    public String assignStorage(@RequestBody StorageAssignmentRequest request) {
        kafkaProducerService.sendStorageAssignmentEvent(request.getStorageLocation(), request.getProductId());
        return "Storage assigned successfully";
    }

    /*@GetMapping("/selectionMessage")
    public ResponseEntity<String> getKafkaMessages() {
        return new ResponseEntity<>(kafkaConsumerComponent.getKafkaSelectionMessage(), HttpStatus.CONTINUE);
    }*/
}
