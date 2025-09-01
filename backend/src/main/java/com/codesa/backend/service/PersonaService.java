package com.codesa.backend.service;

import com.codesa.backend.dto.PersonaDTO;
import com.codesa.backend.entity.Persona;
import com.codesa.backend.exception.ResourceNotFoundException;
import com.codesa.backend.repository.PersonaRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

@Service
@Slf4j
public class PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Obtiene todas las Personas paginados.
     * @param pageable Objeto {@link Pageable} para controlar la paginación.
     */
    public Page<PersonaDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return personaRepository.findAllOrderedById(pageable)
                .map(persona -> modelMapper.map(persona, PersonaDTO.class));
    }

    /**
     * Obtiene un Persona por su ID.
     *
     * @param id ID del Persona.
     * @return {@link PersonaDTO} correspondiente al ID proporcionado.
     * @throws ResourceNotFoundException si no se encuentra el Persona.
     */
    public PersonaDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona no encontrada"));
        return modelMapper.map(persona, PersonaDTO.class);
    }

    /** Servicio para buscar persona por Email */
    public Persona findByEmail(String email) {
        log.info("Buscando persona por email: {}", email);
        return personaRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Email no registrado"));
    }

    /**
     * Crea un nuevo Persona.
     *
     * @param input DTO {@link PersonaDTO} con los datos del Persona.
     * @return {@link PersonaDTO} creado.
     * @throws RuntimeException si la persona ya está registrada como Estudiante, Profesor o Persona.
     */
    public PersonaDTO create(PersonaDTO dto) {
        log.info("Creando persona con email {}", dto.getEmail());

        if (personaRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email ya registrado");
        }

        Persona persona = modelMapper.map(dto, Persona.class);
        return modelMapper.map(personaRepository.save(persona), PersonaDTO.class);
    }

    /**
     * Actualiza un Persona existente.
     *
     * @param id    ID del Persona a actualizar.
     * @param input DTO {@link PersonaDTO} con los nuevos datos.
     * @throws ResourceNotFoundException si no se encuentra el Persona o la persona.
     */
    public PersonaDTO update(Long id, PersonaDTO dto) {
        log.info("Actualizando persona con ID {}", id);
        
        Persona personaExistente = personaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Persona no encontrada"));
        
        if (!personaExistente.getEmail().equals(dto.getEmail()) 
            && personaRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email ya registrado");
        }
        
        modelMapper.map(dto, personaExistente);
        
        personaExistente.setId_persona(id);
        
        Persona personaActualizada = personaRepository.save(personaExistente);
        return modelMapper.map(personaActualizada, PersonaDTO.class);
    }

    /**
     * Elimina una Persona por su ID.
     *
     * @param id ID de la Persona a eliminar.
     * @throws ResourceNotFoundException si no se encuentra la Persona.
     */
    public void delete(Long id) {
        log.warn("Eliminando persona con ID {}", id);

        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona no encontrada"));
        personaRepository.delete(persona);
    }
    
    /**
     * Cuenta el total de Personas registrados.
     *
     * @return Número total de Personas.
     */
    public long countAll() {
        log.info("Contando todas las personas");
            long count = personaRepository.count();
        log.info("Total de personas: {}", count);
    return count;
}

}
