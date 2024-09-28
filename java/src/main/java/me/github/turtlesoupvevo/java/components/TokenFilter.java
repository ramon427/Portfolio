package me.github.turtlesoupvevo.java.components;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import me.github.turtlesoupvevo.java.service.TokenService;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class TokenFilter extends OncePerRequestFilter {

    private final TokenService tokenService;

    public TokenFilter(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        var token = getJwtFromHeader(request);

        if (token != null && tokenService.checkToken(token)) {
            var authentication = getAuthentication(token);

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        String uri = request.getRequestURI();
        String method = request.getMethod();
        return "/api/password".equals(uri) || "/api/token".equals(uri) || ("GET".equalsIgnoreCase(method) && uri.equals("/api/projects"));
    }

    private String getJwtFromHeader(HttpServletRequest request) {
        var header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }

    private Authentication getAuthentication(String token) {
        if (tokenService.checkToken(token)) {
            return new UsernamePasswordAuthenticationToken("user", null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        }
        return null;
    }
}
