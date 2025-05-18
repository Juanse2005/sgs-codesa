package com.codesa.backend.service;

import com.codesa.backend.dto.PersonaDTO;
import com.codesa.backend.entity.Persona;
import com.codesa.backend.exception.ResourceNotFoundException;
import com.codesa.backend.repository.PersonaRepository;

import lombok.extern.slf4j.Slf4j;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<PersonaDTO> getAll() {
        log.info("Obteniendo todas las personas");
        return personaRepository.findAll()
                .stream()
                .map(persona -> modelMapper.map(persona, PersonaDTO.class))
                .toList();
    }

    public PersonaDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona no encontrada"));
        return modelMapper.map(persona, PersonaDTO.class);
    }

    public PersonaDTO create(PersonaDTO dto) {
        log.info("Creando persona con email {}", dto.getEmail());

        if (personaRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email ya registrado");
        }

        Persona persona = modelMapper.map(dto, Persona.class);
        Persona guardada = personaRepository.save(persona);
        return modelMapper.map(guardada, PersonaDTO.class);
    }

    public PersonaDTO update(Long id, PersonaDTO dto) {
        log.info("Actualizando persona con ID {}", id);

        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona no encontrada"));

        dto.setId_persona(id);
        Persona personaActualizada = modelMapper.map(dto, Persona.class);

        return modelMapper.map(personaRepository.save(personaActualizada), PersonaDTO.class);

    }

    public void delete(Long id) {
        log.warn("Eliminando persona con ID {}", id);

        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona no encontrada"));
        personaRepository.delete(persona);
    }
}
