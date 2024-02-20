package com.mywebsite.wimsbackend.controller;

import com.mywebsite.wimsbackend.entities.User;
import com.mywebsite.wimsbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User loginUser) {
        return userService.processLoginAttempt(loginUser);
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User newUser) {
        return userService.processRegistrationAttempt(newUser);
    }
}
