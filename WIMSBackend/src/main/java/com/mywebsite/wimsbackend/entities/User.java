package com.mywebsite.wimsbackend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Data
@Entity
@Table
 @NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String username;

    @Column
    private String email;

    @Column
    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(long id, String username, String email, String password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public boolean checkPassword(String inputPassword) {
        return new BCryptPasswordEncoder().matches(inputPassword, this.password);
    }
}
