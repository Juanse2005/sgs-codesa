package com.codesa.backend.service;

import com.codesa.backend.dto.CreateProfesorDTO;
import com.codesa.backend.dto.EstudianteDTO;
import com.codesa.backend.dto.ProfesorDTO;
import com.codesa.backend.entity.Estudiante;
import com.codesa.backend.entity.Persona;
import com.codesa.backend.entity.Profesor;
import com.codesa.backend.exception.ResourceNotFoundException;
import com.codesa.backend.repository.PersonaRepository;
import com.codesa.backend.repository.ProfesorRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

@Service
@Slf4j
public class ProfesorService {
    @Autowired
    private ProfesorRepository profesorRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Page<ProfesorDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return profesorRepository.findAll(pageable)
                .map(this::toDTO);
    }

    public ProfesorDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Profesor profesor = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("profesor no encontrada"));
        return toDTO(profesor);
    }

    public ProfesorDTO create(CreateProfesorDTO input) {
        log.info("Creando profesor");

        Persona persona = personaRepository.findById(input.getId_persona())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        Profesor est = new Profesor();
        est.setPersona(persona);
        est.setEspecialidad(input.getEspecialidad());
        est.setFecha_contratacion(input.getFecha_contratacion());
        Profesor saved = profesorRepository.save(est);
        return toDTO(saved);

    }

    public ProfesorDTO update(Long id, CreateProfesorDTO input) {
        log.info("Actualizando profesor con ID {}", id);

        Profesor est = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("profesor no encontrada"));
        
                Persona persona = personaRepository.findById(input.getId_persona())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        est.setPersona(persona);
        est.setEspecialidad(input.getEspecialidad());
        est.setFecha_contratacion(input.getFecha_contratacion());
        Profesor updated = profesorRepository.save(est);
        return toDTO(updated);

    }

    public void delete(Long id) {
        log.warn("Eliminando profesor con ID {}", id);

        Profesor profesor = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("profesor no encontrada"));
        profesorRepository.delete(profesor);
    }

    private ProfesorDTO toDTO(Profesor est) {
        Persona p = est.getPersona();
        ProfesorDTO dto = new ProfesorDTO();
        dto.setId_persona(p.getId_persona());
        dto.setNombre(p.getNombre());
        dto.setApellido(p.getApellido());
        dto.setEmail(p.getEmail());
        dto.setTelefono(p.getTelefono());
        dto.setFecha_nacimiento(p.getFecha_nacimiento());
        dto.setEspecialidad(est.getEspecialidad());
        dto.setFecha_contratacion(est.getFecha_contratacion());
        return dto;
    }

}
