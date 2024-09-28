package me.github.turtlesoupvevo.java.controller;

import me.github.turtlesoupvevo.java.service.TokenService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/token")
public class TokenController {

    private final TokenService tokenService;

    public TokenController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping
    public boolean validateToken(@RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.substring(7);
        return tokenService.checkToken(token);
    }
}
