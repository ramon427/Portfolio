package me.github.turtlesoupvevo.java.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("passwords")
public class EncodedPassword {

    @Id
    private String id;

    private String password;

    public EncodedPassword(String id, String password) {
        this.id = id;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
