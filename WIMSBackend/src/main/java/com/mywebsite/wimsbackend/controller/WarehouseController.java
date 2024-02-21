package com.mywebsite.wimsbackend.controller;

import com.mywebsite.wimsbackend.entities.Orders;
import com.mywebsite.wimsbackend.entities.ProductSelectionRequest;
import com.mywebsite.wimsbackend.entities.StorageAssignmentRequest;
import com.mywebsite.wimsbackend.services.KafkaProducerService;
import com.mywebsite.wimsbackend.services.OrderService;
import com.mywebsite.wimsbackend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
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

    @Autowired
    private KafkaTemplate<String, StorageAssignmentRequest> kafkaTemplate;

    @Autowired
    private OrderService orderService;

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
    public ResponseEntity<Map<String, String>> assignStorage(@RequestBody StorageAssignmentRequest request) {
        System.out.println("------");
        System.out.println(request);
        System.out.println("------");

        kafkaProducerService.sendStorageAssignmentEvent(request);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Assignment request sent successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);
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

    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<ProductSelectionRequest> deleteProduct(@PathVariable String id) {
        System.out.println("------");
        System.out.println("DELETE REQUEST FOR: " + id);
        System.out.println("------");

        ResponseEntity<ProductSelectionRequest> productDeleted = productService.deleteProduct(id);

        System.out.println("------");
        System.out.println(productDeleted.getBody());
        System.out.println("------");
        return productDeleted;
    }

    public void saveOrder(Orders orders) {
        System.out.println("Inserting into database");
        orderService.saveOrder(orders);
    }

    @GetMapping("/getOrders")
    public List<Orders> getOrders() {
        return orderService.getOrders();
    }

    @PutMapping("/setShipped/{orderId}")
    public ResponseEntity<Orders> setShipped (@PathVariable long orderId) {

        return orderService.setShipped(orderId);
    }
}
