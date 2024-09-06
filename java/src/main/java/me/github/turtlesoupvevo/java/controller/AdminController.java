package me.github.turtlesoupvevo.java.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import me.github.turtlesoupvevo.java.service.PasswordService;
import me.github.turtlesoupvevo.java.service.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/password")
public class AdminController {

    private final PasswordService passwordService;
    private final TokenService tokenService;

    public AdminController(PasswordService passwordService, TokenService tokenService) {
        this.passwordService = passwordService;
        this.tokenService = tokenService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> receivePassword(@RequestBody Map<String, String> requestBody, HttpServletResponse servletResponse) {
        String password = requestBody.get("password");
        var passwordCorrect = passwordService.checkPassword(password);
        var response = new HashMap<String, Object>();

        if (passwordCorrect) {
            var token = tokenService.generateToken();

            Cookie cookie = new Cookie("jwtToken", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(3600);
            servletResponse.addCookie(cookie);

            response.put("token", token);
            response.put("success", true);
            response.put("message", "Successful");

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        response.put("success", false);
        response.put("message", "Unsuccessful");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
