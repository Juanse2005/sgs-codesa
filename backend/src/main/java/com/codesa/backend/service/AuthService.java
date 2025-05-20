package com.codesa.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codesa.backend.dto.AuthResponse;
import com.codesa.backend.dto.LoginRequest;
import com.codesa.backend.dto.RegisterRequest;
import com.codesa.backend.entity.Persona;
import com.codesa.backend.repository.PersonaRepository;
import com.codesa.backend.security.JwtUtil;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse login(LoginRequest request) {
        log.info("Intentando login con email {}", request.getEmail());

        Persona persona = personaRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email no registrado"));

        if (!persona.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Contraseña incorrecta");
        }

        String token = jwtUtil.generateToken(persona.getEmail());
        return new AuthResponse(persona.getEmail(), token);
    }

    public AuthResponse register(RegisterRequest request) {
        log.info("Creando persona con email {}", request.getEmail());

        if (personaRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email ya registrado");
        }

        Persona persona = modelMapper.map(request, Persona.class);
        Persona guardada = personaRepository.save(persona);

        String token = jwtUtil.generateToken(guardada.getEmail());

        return new AuthResponse(guardada.getEmail(), token);
    }
}
