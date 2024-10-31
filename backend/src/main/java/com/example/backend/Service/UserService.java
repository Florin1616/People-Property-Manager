package com.example.backend.Service;

import com.example.backend.Model.User;
import com.example.backend.Repo.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private Set<String> blacklistedTokens = new HashSet<>();

    private final String SECRET_KEY = "secret";
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    // Call this method when a user logs out
    public void logout(String token) {
        blacklistedTokens.add(token);
    }

    // Call this method to check if a token is valid
    public boolean isTokenValid(String token) {
        return !blacklistedTokens.contains(token);
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }



    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String login(String username, String password) {
        try {
            User user = userRepository.findByUsername(username);
            if (user == null) {
                logger.error("User not found with username: {}", username);
                throw new UsernameNotFoundException("User not found with username: " + username);
            }

            if (passwordEncoder.matches(password, user.getPassword())) {
                logger.info("Login successful for user: {}", username);
                return Jwts.builder()
                        .setSubject(user.getId().toString())
                        .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour
                        .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                        .compact();
            } else {
                logger.error("Password does not match for user: {}", username);
                throw new BadCredentialsException("Invalid password");
            }
        } catch (Exception e) {
            logger.error("Error during login process", e);
            throw e;
        }
    }
}
