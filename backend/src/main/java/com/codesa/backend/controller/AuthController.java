package com.codesa.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.codesa.backend.dto.AuthResponse;
import com.codesa.backend.dto.LoginRequest;
import com.codesa.backend.dto.RegisterRequest;

import com.codesa.backend.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        {
            return ResponseEntity.ok(authService.login(request));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        {
            return ResponseEntity.ok(authService.register(request));
        }
    }
}
