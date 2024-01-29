package com.mywebsite.wimsbackend;

import com.mywebsite.wimsbackend.requests.ProductSelectionRequest;
import com.mywebsite.wimsbackend.requests.StorageAssignmentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/warehouse")
@CrossOrigin
public class WarehouseController {
    @Autowired
    private KafkaProducerService kafkaProducerService;

    @PostMapping("/selectProduct")
    public String selectProduct(@RequestBody ProductSelectionRequest request) {
        kafkaProducerService.sendProductSelectionEvent(request.getProductId(), request.getStorageLocation());
        return "Product selected successfully!";
    }

    @PostMapping("/assignStorage")
    public String assignStorage(@RequestBody StorageAssignmentRequest request) {
        kafkaProducerService.sendStorageAssignmentEvent(request.getStorageLocation(), request.getProductId());
        return "Storage assigned successfully";
    }
}
