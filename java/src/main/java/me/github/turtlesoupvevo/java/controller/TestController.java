package me.github.turtlesoupvevo.java.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String test(HttpServletResponse servletResponse) {
        System.out.println(servletResponse);
        return "Hello World";
    }
}
