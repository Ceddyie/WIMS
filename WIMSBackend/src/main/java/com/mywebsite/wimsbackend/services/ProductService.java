package com.mywebsite.wimsbackend.services;

import com.mywebsite.wimsbackend.entities.ProductSelectionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Service
@CrossOrigin
public class ProductService {
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public List<ProductSelectionRequest> getAllProducts() {
        return jdbcTemplate.query("SELECT * FROM product", new BeanPropertyRowMapper<>(ProductSelectionRequest.class));
    }

    public ResponseEntity<ProductSelectionRequest> addProduct(ProductSelectionRequest request) {
        if (request.getImageUrl() == null)
            request.setImageUrl("https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg");


        MapSqlParameterSource namedParameters = new MapSqlParameterSource();
        namedParameters.addValue("productId", request.getProductId());
        namedParameters.addValue("productName", request.getProductName());
        namedParameters.addValue("imageUrl", request.getImageUrl());

        if (!checkForExistingProduct(request.getProductId(), request.getProductName())) {
            jdbcTemplate.update("INSERT INTO product (product_id, product_name, image_url) VALUES (:productId, :productName, :imageUrl)", namedParameters);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        }
    }

    private boolean checkForExistingProduct(String productId, String productName) {
        System.out.println("Checking for existing product...");

        MapSqlParameterSource namedParameters = new MapSqlParameterSource();
        namedParameters.addValue("productId", productId);
        namedParameters.addValue("productName", productName);

        List<ProductSelectionRequest> list = jdbcTemplate.query("SELECT * FROM product WHERE product_id = :productId AND product_name = :productName OR product_id = :productId", namedParameters, new BeanPropertyRowMapper<>(ProductSelectionRequest.class));

        if (!list.isEmpty()) {
            System.out.println("Product with same id and/or name already exists");
            return true;
        }
        else {
            System.out.println("No Product found");
            return false;
        }
    }
}
