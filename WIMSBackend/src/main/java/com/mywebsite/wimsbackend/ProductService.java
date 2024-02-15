package com.mywebsite.wimsbackend;

import com.mywebsite.wimsbackend.requests.ProductSelectionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@Service
@CrossOrigin
public class ProductService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<ProductSelectionRequest> getAllProducts() {
        return jdbcTemplate.query("SELECT * FROM product", new BeanPropertyRowMapper<>(ProductSelectionRequest.class));
    }
}
