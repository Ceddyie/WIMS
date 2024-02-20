package com.mywebsite.wimsbackend.services;

import com.mywebsite.wimsbackend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@CrossOrigin
public class UserService {
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public ResponseEntity<User> processLoginAttempt(User loginUser) {
        MapSqlParameterSource namedParameters = new MapSqlParameterSource();
        namedParameters.addValue("username", loginUser.getUsername());

        List<User> users;
        try {
            users = jdbcTemplate.query("SELECT username, password FROM user WHERE username = :username", namedParameters, new BeanPropertyRowMapper<>(User.class));
            if (users.isEmpty()) {
                System.out.println("NO USER FOUND FOR " + loginUser.getUsername());
                return new ResponseEntity<User>((User) null, HttpStatus.NOT_FOUND);
            }
        }
        catch (EmptyResultDataAccessException e) {
            System.out.println("NO USER FOUND FOR " + loginUser.getUsername());
            return new ResponseEntity<User>((User) null, HttpStatus.NOT_FOUND);
        }

        if (users.get(0).checkPassword(loginUser.getPassword())) {
            System.out.println("CORRECT PASSWORD");
        } else {
            System.out.println("INCORRECT PAWWORD");
            return new ResponseEntity<User>((User) null, HttpStatus.UNAUTHORIZED);
        }
        System.out.println("Login processing...");
        return new ResponseEntity<User>(loginUser, HttpStatus.OK);
    }

    public ResponseEntity<User> processRegistrationAttempt(User newUser) {
        if (checkForExistingUser(newUser.getEmail(), newUser.getUsername())) {
            try {
                System.out.println("Registration attempt proceeding...");
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                Map<String, Object> namedParameters = new HashMap<>();

                if (newUser.getPassword().length() < 8) {
                    throw new IllegalArgumentException("Password must be at least 8 characters long!");
                }

                namedParameters.put("username", newUser.getUsername());
                namedParameters.put("password", passwordEncoder.encode(newUser.getPassword()));
                namedParameters.put("email", newUser.getEmail());

                try {
                    jdbcTemplate.update("INSERT INTO user (username, password, email) VALUES (:username, :password, :email)", namedParameters);
                    return new ResponseEntity<User>(newUser, HttpStatus.OK);
                } catch (DataAccessException e) {
                    throw e;
                }
            } catch (EmptyResultDataAccessException e) {
                return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
            }
        } else {
            System.out.println("Error! Username and/or email already taken.");
            return new ResponseEntity<User>(HttpStatus.CONFLICT);
        }
    }

    private boolean checkForExistingUser(String email, String username) {
        System.out.println("Checking for existing user");
        MapSqlParameterSource namedParameters = new MapSqlParameterSource();
        namedParameters.addValue("email", email);
        namedParameters.addValue("username", username);

        List<User> users = jdbcTemplate.query("SELECT * FROM user WHERE email = :email OR username = :username", namedParameters, new BeanPropertyRowMapper<>(User.class));

        if (users.isEmpty()) {
            System.out.println("Username and email available!");
            return true;
        }
        else {
            System.out.println("Username or email already taken!");
            return false;
        }
    }
}
