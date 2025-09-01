package com.codesa.backend.service;

import com.codesa.backend.dto.AdministrativoDTO;
import com.codesa.backend.dto.CreateEstudianteDTO;
import com.codesa.backend.dto.EstudianteDTO;
import com.codesa.backend.entity.Estudiante;
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

@Service
@Slf4j
public class EstudianteService {
    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private ProfesorRepository profesorRepository;

    @Autowired
    private AdministrativoRepository administrativoRepository;

    @Autowired
    private PersonaRepository personaRepository;

    /**
     * Obtiene todos los Estudiantes paginados.
     * @param pageable Objeto {@link Pageable} para controlar la paginación.
     */
    public Page<EstudianteDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todos los estudiantes");
        return estudianteRepository.findAllOrderedById(pageable)
                .map(this::toDTO);
    }

    /**
     * Obtiene un Estudiante por su ID.
     *
     * @param id ID del Estudiante.
     * @return {@link EstudianteDTO} correspondiente al ID proporcionado.
     * @throws ResourceNotFoundException si no se encuentra el Estudiante.
     */
    public EstudianteDTO getById(Long id) {
        log.info("Obteniendo estudiante con ID {}", id);
        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrada"));
        return toDTO(estudiante);
    }

    /**
     * Crea un nuevo Estudiante.
     *
     * @param input DTO {@link CreateEstudianteDTO} con los datos del Estudiante.
     * @return {@link AdministrativoDTO} creado.
     * @throws RuntimeException si la persona ya está registrada como Estudiante, Profesor o Administrativo.
     */
    public EstudianteDTO create(CreateEstudianteDTO input) {
        log.info("Creando estudiante");

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

        Estudiante est = new Estudiante();
        est.setPersona(persona);
        est.setNumero_matricula(input.getNumero_matricula());
        est.setGrado(input.getGrado());
        Estudiante saved = estudianteRepository.save(est);

        return toDTO(saved);
    }

    /**
     * Actualiza un Estudiante existente.
     *
     * @param id    ID del Estudiante a actualizar.
     * @param input DTO {@link CreateEstudianteDTO} con los nuevos datos.
     * @throws ResourceNotFoundException si no se encuentra el Estudiante o la persona.
     */
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

    /**
     * Elimina un Estudiante por su ID.
     *
     * @param id ID del Estudiante a eliminar.
     * @throws ResourceNotFoundException si no se encuentra el Estudiante.
     */
    public void delete(Long id) {
        log.warn("Eliminando estudiante con ID {}", id);
        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrada"));
        estudianteRepository.delete(estudiante);
    }

    /**
     * Convierte una entidad {@link Estudiante} a {@link EstudianteDTO}.
     */
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

    /**
     * Cuenta el total de Estudiantes registrados.
     *
     * @return Número total de Estudiantes.
     */
        public long countAll() {
        log.info("Contando todos los estudiantes");
            long count = estudianteRepository.count();
        log.info("Total de estudiantes: {}", count);
    return count;
    }
}
