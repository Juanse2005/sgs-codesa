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

/**
 * Servicio que maneja la autenticación y registro de usuarios.
 * Proporciona métodos para iniciar sesión y registrar nuevos usuarios,
 * utilizando {@link PersonaRepository} para acceder a los datos, 
 * {@link ModelMapper} para mapear DTOs a entidades, y {@link JwtUtil} para generar tokens JWT.
 */

@Service
@Slf4j
public class AuthService {

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Realiza el proceso de inicio de sesión de un usuario.
     *
     * @param request Objeto {@link LoginRequest} que contiene el email y la contraseña del usuario.
     * @return {@link AuthResponse} que incluye nombre, apellido, email y token JWT generado.
     * @throws IllegalArgumentException si el email no está registrado o la contraseña es incorrecta.
     */
    public AuthResponse login(LoginRequest request) {
        log.info("Intentando login con email {}", request.getEmail());

        Persona persona = personaRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email no registrado"));

        if (!persona.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Contraseña incorrecta");
        }

        String token = jwtUtil.generateToken(persona.getEmail());
        return new AuthResponse(persona.getNombre(),persona.getApellido(),persona.getEmail(), token);
    }

    /**
     * Registra un nuevo usuario en el sistema.
     *
     * @param request Objeto {@link RegisterRequest} que contiene los datos necesarios para crear la persona.
     * @return {@link AuthResponse} que incluye nombre, apellido, email y token JWT generado.
     * @throws IllegalArgumentException si el email ya está registrado.
     */    
    public AuthResponse register(RegisterRequest request) {
        log.info("Creando persona con email {}", request.getEmail());

        if (personaRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email ya registrado");
        }

        Persona persona = modelMapper.map(request, Persona.class);
        Persona guardada = personaRepository.save(persona);

        String token = jwtUtil.generateToken(guardada.getEmail());

        return new AuthResponse(guardada.getNombre(),guardada.getApellido(),guardada.getEmail(), token);
    }
}
