package com.codesa.backend.service;

import com.codesa.backend.dto.CreateEstudianteDTO;
import com.codesa.backend.dto.EstudianteDTO;
import com.codesa.backend.dto.PersonaDTO;
import com.codesa.backend.entity.Estudiante;
import com.codesa.backend.entity.Persona;
import com.codesa.backend.exception.ResourceNotFoundException;
import com.codesa.backend.repository.EstudianteRepository;
import com.codesa.backend.repository.PersonaRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

@Service
@Slf4j
public class EstudianteService {
    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private PersonaRepository personaRepository;

    public Page<EstudianteDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todos los estudiantes");
        return estudianteRepository.findAll(pageable)
                .map(this::toDTO);
    }

    public EstudianteDTO getById(Long id) {
        log.info("Obteniendo estudiante con ID {}", id);
        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrada"));
        return toDTO(estudiante);
    }

    public EstudianteDTO create(CreateEstudianteDTO input) {
        Persona persona = personaRepository.findById(input.getId_persona())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        Estudiante est = new Estudiante();
        est.setPersona(persona);
        est.setNumero_matricula(input.getNumero_matricula());
        est.setGrado(input.getGrado());
        Estudiante saved = estudianteRepository.save(est);

        return toDTO(saved);
    }

    public EstudianteDTO update(Long id, CreateEstudianteDTO input) {
        log.info("Actualizando estudiante con ID {}", id);

        Estudiante est = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrada"));

        Persona persona = personaRepository.findById(input.getId_persona())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        est.setPersona(persona);
        est.setNumero_matricula(input.getNumero_matricula());
        est.setGrado(input.getGrado());
        Estudiante updated = estudianteRepository.save(est);

        return toDTO(updated);
    }

    public void delete(Long id) {
        log.warn("Eliminando estudiante con ID {}", id);
        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrada"));
        estudianteRepository.delete(estudiante);
    }

    private EstudianteDTO toDTO(Estudiante est) {
        Persona p = est.getPersona();
        EstudianteDTO dto = new EstudianteDTO();
        dto.setId_persona(p.getId_persona());
        dto.setNombre(p.getNombre());
        dto.setApellido(p.getApellido());
        dto.setEmail(p.getEmail());
        dto.setTelefono(p.getTelefono());
        dto.setFecha_nacimiento(p.getFecha_nacimiento());
        dto.setNumero_matricula(est.getNumero_matricula());
        dto.setGrado(est.getGrado());
        return dto;
    }
}
