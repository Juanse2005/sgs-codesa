package com.codesa.backend.service;

import com.codesa.backend.dto.CreateCursoDTO;
import com.codesa.backend.dto.CursoDTO;
import com.codesa.backend.entity.Curso;
import com.codesa.backend.entity.Persona;
import com.codesa.backend.entity.Profesor;
import com.codesa.backend.exception.ResourceNotFoundException;
import com.codesa.backend.repository.CursoRepository;
import com.codesa.backend.repository.ProfesorRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

@Service
@Slf4j
public class CursoService {
    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private ProfesorRepository profesorRepository;

    /**
     * Obtiene todos los cursos paginados.
     * @param pageable Objeto {@link Pageable} para controlar la paginación.
     */
    public Page<CursoDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return cursoRepository.findAllOrderedById(pageable)
                .map(this::toDTO);
    }

    /**
     * Obtiene un curso por su ID.
     *
     * @param id ID del Curso.
     * @return {@link CursoDTO} correspondiente al ID proporcionado.
     * @throws ResourceNotFoundException si no se encuentra el Curso.
     */
    public CursoDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("curso no encontrada"));
        return toDTO(curso);
    }

    /**
     * Crea un nuevo curso.
     */
    public CursoDTO create(CreateCursoDTO input) {
        log.info("Creando curso");

        Profesor profesor = profesorRepository.findById(input.getId_profesor())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        Curso est = new Curso();
        est.setProfesor(profesor);
        est.setNombre_curso(input.getNombre_curso());
        est.setDescripcion(input.getDescripcion());
        est.setCreditos(input.getCreditos());

        Curso saved = cursoRepository.save(est);

        return toDTO(saved);
    }

    /**
     * Actualiza un Curso existente.
     *
     * @param id    ID del Curso a actualizar.
     * @param input DTO {@link CreateCursoDTO} con los nuevos datos.
     * @throws ResourceNotFoundException si no se encuentra el Curso o el profesor.
     */
    public CursoDTO update(Long id, CreateCursoDTO input) {
        log.info("Actualizando curso con ID {}", id);

        Curso est = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("curso no encontrada"));

        Profesor profesor = profesorRepository.findById(input.getId_profesor())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        est.setProfesor(profesor);
        est.setNombre_curso(input.getNombre_curso());
        est.setDescripcion(input.getDescripcion());
        est.setCreditos(input.getCreditos());
        Curso curso = cursoRepository.save(est);
        return toDTO(curso);
    }

    /**
     * Elimina un curso por su ID.
     *
     * @param id ID del curso a eliminar.
     * @throws ResourceNotFoundException si no se encuentra el curso.
     */
    public void delete(Long id) {
        log.warn("Eliminando curso con ID {}", id);

        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("curso no encontrada"));
        cursoRepository.delete(curso);
    }

    /**
     * Convierte una entidad {@link Curso} a {@link CursoDTO}.
     */
    private CursoDTO toDTO(Curso curso) {
        Profesor profesor = curso.getProfesor();
        Persona persona = profesor.getPersona();

        CursoDTO dto = new CursoDTO();

        // Curso
        dto.setId_curso(curso.getId_curso());
        dto.setNombre_curso(curso.getNombre_curso());
        dto.setDescripcion(curso.getDescripcion());
        dto.setCreditos(curso.getCreditos());

        // Profesor
        dto.setId_profesor(profesor.getId());
        dto.setEspecialidad(profesor.getEspecialidad());
        dto.setFecha_contratacion(profesor.getFecha_contratacion());

        // Persona
        dto.setNombre_persona(persona.getNombre());
        dto.setApellido(persona.getApellido());
        dto.setEmail(persona.getEmail());
        dto.setTelefono(persona.getTelefono());
        dto.setFecha_nacimiento(persona.getFecha_nacimiento());

        return dto;
    }

    /**
     * Cuenta el total de cursos registrados.
     *
     * @return Número total de cursos.
     */
        public long countAll() {
        log.info("Contando todos los cursos");
            long count = cursoRepository.count();
        log.info("Total de cursos: {}", count);
    return count;
}


}
