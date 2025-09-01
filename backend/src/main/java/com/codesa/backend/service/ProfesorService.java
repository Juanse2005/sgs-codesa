package com.codesa.backend.service;

import com.codesa.backend.dto.CreateProfesorDTO;
import com.codesa.backend.dto.ProfesorDTO;
import com.codesa.backend.entity.Persona;
import com.codesa.backend.entity.Profesor;
import com.codesa.backend.exception.ResourceNotFoundException;
import com.codesa.backend.repository.AdministrativoRepository;
import com.codesa.backend.repository.EstudianteRepository;
import com.codesa.backend.repository.PersonaRepository;
import com.codesa.backend.repository.ProfesorRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

@Service
@Slf4j
public class ProfesorService {

    @Autowired
    private ProfesorRepository profesorRepository;
    
    @Autowired
    private AdministrativoRepository administrativoRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;


    @Autowired
    private PersonaRepository personaRepository;

    /**
     * Obtiene todas las Profesores paginados.
     * @param pageable Objeto {@link Pageable} para controlar la paginación.
     */
    public Page<ProfesorDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return profesorRepository.findAllOrderedById(pageable)
                .map(this::toDTO);
    }

    /**
     * Obtiene un Profesor por su ID.
     *
     * @param id ID del Profesor.
     * @return {@link ProfesorDTO} correspondiente al ID proporcionado.
     * @throws ResourceNotFoundException si no se encuentra el Profesor.
     */
    public ProfesorDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Profesor profesor = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("profesor no encontrada"));
        return toDTO(profesor);
    }

    /**
     * Crea un nuevo Profesor.
     *
     * @param input DTO {@link CreateProfesorDTO} con los datos del Profesor.
     * @return {@link ProfesorDTO} creado.
     * @throws RuntimeException si la persona ya está registrada como Estudiante, Profesor o Profesor.
     */
    public ProfesorDTO create(CreateProfesorDTO input) {
        log.info("Creando profesor");

        Persona persona = personaRepository.findById(input.getId_persona())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

    // Valida que persona no este registrada en otra tabla hija
        if (estudianteRepository.existsByPersona(persona)) {
            throw new RuntimeException("La persona ya está registrada como Estudiante");
        }

        if (administrativoRepository.existsByPersona(persona)) {
            throw new RuntimeException("La persona ya está registrada como Administrativo");
        }

        if (profesorRepository.existsByPersona(persona)) {
            throw new RuntimeException("La persona ya está registrada como Profesor");
        }


        Profesor est = new Profesor();
        est.setPersona(persona);
        est.setEspecialidad(input.getEspecialidad());
        est.setFecha_contratacion(input.getFecha_contratacion());
        Profesor saved = profesorRepository.save(est);
        return toDTO(saved);

    }

    /**
     * Actualiza un Profesor existente.
     *
     * @param id    ID del Profesor a actualizar.
     * @param input DTO {@link CreateProfesorDTO} con los nuevos datos.
     * @throws ResourceNotFoundException si no se encuentra el Profesor o la persona.
     */
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

    /**
     * Elimina una Profesor por su ID.
     *
     * @param id ID de la Profesor a eliminar.
     * @throws ResourceNotFoundException si no se encuentra la Profesor.
     */
    public void delete(Long id) {
        log.warn("Eliminando profesor con ID {}", id);

        Profesor profesor = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("profesor no encontrada"));
        profesorRepository.delete(profesor);
    }


    /**
     * Convierte una entidad {@link Profesor} a {@link ProfesorDTO}.
     */
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

    /**
     * Cuenta el total de Profesores registrados.
     *
     * @return Número total de Profesores.
     */
        public long countAll() {
        log.info("Contando todos los profesores");
            long count = profesorRepository.count();
        log.info("Total de profesores: {}", count);
            return count;

}
}
