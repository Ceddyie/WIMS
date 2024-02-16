package com.mywebsite.wimsbackend;

import com.mywebsite.wimsbackend.requests.ProductSelectionRequest;
import com.mywebsite.wimsbackend.requests.StorageAssignmentRequest;
import com.mywebsite.wimsbackend.services.KafkaProducerService;
import com.mywebsite.wimsbackend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/warehouse")
@CrossOrigin
public class WarehouseController {
    @Autowired
    private KafkaProducerService kafkaProducerService;

    @Autowired
    private ProductService productService;

    @GetMapping("/getProducts")
    public List<ProductSelectionRequest> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/selectProduct")
    public ResponseEntity<Map<String, String>> selectProduct(@RequestBody ProductSelectionRequest request) {
        kafkaProducerService.sendProductSelectionEvent(request.getProductId(), request.getAmount());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Product selected successfully!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/assignStorage")
    public ResponseEntity<StorageAssignmentRequest> assignStorage(@RequestBody StorageAssignmentRequest request) {
        System.out.println("------");
        System.out.println(request);
        System.out.println("------");

        return kafkaProducerService.sendStorageAssignmentEvent(request);
    }

    @PostMapping("/addProduct")
    public ResponseEntity<ProductSelectionRequest> addProduct(@RequestBody ProductSelectionRequest request) {
        System.out.println("------");
        System.out.println(request);
        System.out.println("------");
        ResponseEntity<ProductSelectionRequest> productAdded = productService.addProduct(request);

        System.out.println("------");
        System.out.println(productAdded.getBody());
        System.out.println("------");
        return productAdded;
    }
}
