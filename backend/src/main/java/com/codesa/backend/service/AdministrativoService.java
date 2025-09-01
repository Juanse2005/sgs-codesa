package com.codesa.backend.service;

import com.codesa.backend.dto.AdministrativoDTO;
import com.codesa.backend.dto.CreateAdministrativoDTO;
import com.codesa.backend.entity.Administrativo;
import com.codesa.backend.entity.Persona;
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

/**
 * Servicio para la gestión de administrativos.
 * Proporciona métodos para obtener, crear, actualizar y eliminar
 * registros de administrativos, además de mapear entidades a DTOs.
 */
@Service
@Slf4j
public class AdministrativoService {
    @Autowired
    private AdministrativoRepository administrativoRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private ProfesorRepository profesorRepository;

    @Autowired
    private PersonaRepository personaRepository;


    /**
     * Obtiene todos los administrativos paginados.
     * @param pageable Objeto {@link Pageable} para controlar la paginación.
     */
    public Page<AdministrativoDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return administrativoRepository.findAllOrderedById(pageable)
                .map(this::toDTO);
    }

    /**
     * Obtiene un administrativo por su ID.
     *
     * @param id ID del administrativo.
     * @return {@link AdministrativoDTO} correspondiente al ID proporcionado.
     * @throws ResourceNotFoundException si no se encuentra el administrativo.
     */
    public AdministrativoDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Administrativo administrativo = administrativoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("administrativo no encontrada"));
        return toDTO(administrativo);
    }

    /**
     * Crea un nuevo administrativo.
     *
     * @param input DTO {@link CreateAdministrativoDTO} con los datos del administrativo.
     * @return {@link AdministrativoDTO} creado.
     * @throws RuntimeException si la persona ya está registrada como Estudiante, Profesor o Administrativo.
     */
    public AdministrativoDTO create(CreateAdministrativoDTO input) {
        log.info("Creando administrativo");

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

    Administrativo est = new Administrativo();
    est.setPersona(persona);
    est.setCargo(input.getCargo());
    est.setDepartamento(input.getDepartamento());
    Administrativo saved = administrativoRepository.save(est);

    return toDTO(saved);
    }


    /**
     * Actualiza un administrativo existente.
     *
     * @param id    ID del administrativo a actualizar.
     * @param input DTO {@link CreateAdministrativoDTO} con los nuevos datos.
     * @throws ResourceNotFoundException si no se encuentra el administrativo o la persona.
     */
    public AdministrativoDTO update(Long id, CreateAdministrativoDTO input) {
        log.info("Actualizando administrativo con ID {}", id);

        Administrativo est = administrativoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("administrativo no encontrada"));

        Persona persona = personaRepository.findById(input.getId_persona())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        est.setPersona(persona);
        est.setCargo(input.getCargo());
        est.setDepartamento(input.getDepartamento());
        Administrativo updated = administrativoRepository.save(est);

        return toDTO(updated);
    }

    /**
     * Elimina un administrativo por su ID.
     *
     * @param id ID del administrativo a eliminar.
     * @throws ResourceNotFoundException si no se encuentra el administrativo.
     */
    public void delete(Long id) {
        log.warn("Eliminando administrativo con ID {}", id);

        Administrativo administrativo = administrativoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("administrativo no encontrada"));
        administrativoRepository.delete(administrativo);
    }

    /**
     * Convierte una entidad {@link Administrativo} a {@link AdministrativoDTO}.
     */
    private AdministrativoDTO toDTO(Administrativo est) {
        Persona p = est.getPersona();
        AdministrativoDTO dto = new AdministrativoDTO();
        dto.setId_persona(p.getId_persona());
        dto.setNombre(p.getNombre());
        dto.setApellido(p.getApellido());
        dto.setEmail(p.getEmail());
        dto.setTelefono(p.getTelefono());
        dto.setFecha_nacimiento(p.getFecha_nacimiento());
        dto.setCargo(est.getCargo());
        dto.setDepartamento(est.getDepartamento());
        return dto;
    }


    /**
     * Cuenta el total de administrativos registrados.
     *
     * @return Número total de administrativos.
     */
        public long countAll() {
        log.info("Contando todos los administrativos");
            long count = administrativoRepository.count();
        log.info("Total de administrativos: {}", count);
    return count;
}
}