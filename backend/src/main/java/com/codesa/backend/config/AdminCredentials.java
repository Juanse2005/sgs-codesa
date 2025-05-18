package com.codesa.backend.config;

import com.codesa.backend.entity.Persona;
import com.codesa.backend.repository.PersonaRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
@RequiredArgsConstructor
public class AdminCredentials {
    
    private final PersonaRepository personaRepository;

    @Bean
    CommandLineRunner initDefaultUser() {
        return args -> {
            String defaultEmail = "admin@admin.com";

            if (!personaRepository.existsByEmail(defaultEmail)) {
                Persona persona = new Persona();
                persona.setNombre("Admin");
                persona.setApellido("Sistema");
                persona.setFecha_nacimiento(LocalDate.of(2005, 05, 25));
                persona.setEmail(defaultEmail);
                persona.setPassword("123456");
                persona.setTelefono("3000000000");

                personaRepository.save(persona);
                System.out.println("✅ Usuario por defecto creado: admin@admin.com / 123456");
            }
        };
    }
}