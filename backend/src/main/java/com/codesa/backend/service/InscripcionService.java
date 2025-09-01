package com.codesa.backend.service;

import com.codesa.backend.dto.CreateInscripcionDTO;
import com.codesa.backend.dto.InscripcionDTO;
import com.codesa.backend.entity.Curso;
import com.codesa.backend.entity.Estudiante;
import com.codesa.backend.entity.Inscripcion;
import com.codesa.backend.exception.ResourceNotFoundException;
import com.codesa.backend.repository.CursoRepository;
import com.codesa.backend.repository.EstudianteRepository;
import com.codesa.backend.repository.InscripcionRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

@Service
@Slf4j
public class InscripcionService {
    @Autowired
    private InscripcionRepository inscripcionRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private CursoRepository cursoRepository;

    /**
     * Obtiene todas las Inscripciones paginados.
     * @param pageable Objeto {@link Pageable} para controlar la paginación.
     */
    public Page<InscripcionDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return inscripcionRepository.findAllOrderedById(pageable)
                .map(this::toDTO);
    }

    /**
     * Obtiene un Inscripcion por su ID.
     *
     * @param id ID del Inscripcion.
     * @return {@link InscripcionDTO} correspondiente al ID proporcionado.
     * @throws ResourceNotFoundException si no se encuentra el Inscripcion.
     */
    public InscripcionDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("inscripcion no encontrada"));
        return toDTO(inscripcion);
    }

    /**
     * Crea una nueva Inscripcion.
     *
     * @param input DTO {@link CreateInscripcionDTO} con los datos de la Inscripcion.
     * @return {@link InscripcionDTO} creado.
     */
    public InscripcionDTO create(CreateInscripcionDTO input) {
        log.info("Creando inscripción");

        Estudiante estudiante = estudianteRepository.findById(input.getId_estudiante())
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado"));

        Curso curso = cursoRepository.findById(input.getId_curso())
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado"));
        
        //Valida si el estudiante ya está inscrito en el curso
        if (inscripcionRepository.existsByEstudianteAndCurso(estudiante, curso)) {
                throw new IllegalArgumentException("El estudiante ya está inscrito en este curso");
            }


        Inscripcion ins = new Inscripcion();
        ins.setEstudiante(estudiante);
        ins.setCurso(curso);
        ins.setFecha_inscripcion(input.getFecha_inscripcion());

        Inscripcion saved = inscripcionRepository.save(ins);

        return toDTO(saved);
    }

    /**
     * Actualiza una Inscripcion existente.
     *
     * @param id    ID de la Inscripcion a actualizar.
     * @param input DTO {@link CreateInscripcionDTO} con los nuevos datos.
     * @throws ResourceNotFoundException si no se encuentra el Inscripcion o la persona.
     */
    public InscripcionDTO update(Long id, CreateInscripcionDTO input) {
        log.info("Actualizando inscripcion con ID {}", id);

        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inscripción no encontrada"));

        Estudiante estudiante = estudianteRepository.findById(input.getId_estudiante())
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado"));

        Curso curso = cursoRepository.findById(input.getId_curso())
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado"));

                
        inscripcion.setEstudiante(estudiante);
        inscripcion.setCurso(curso);
        inscripcion.setFecha_inscripcion(input.getFecha_inscripcion());

        Inscripcion updated = inscripcionRepository.save(inscripcion);

        return toDTO(updated);
    }

    /**
     * Elimina una inscripcion por su ID.
     *
     * @param id ID de la inscripcion a eliminar.
     * @throws ResourceNotFoundException si no se encuentra la inscripcion.
     */
    public void delete(Long id) {
        log.warn("Eliminando inscripcion con ID {}", id);

        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("inscripcion no encontrada"));
        inscripcionRepository.delete(inscripcion);
    }

    /**
     * Convierte una entidad {@link Inscripcion} a {@link InscripcionDTO}.
     */
    private InscripcionDTO toDTO(Inscripcion ins) {
        InscripcionDTO dto = new InscripcionDTO();
        dto.setId_inscripcion(ins.getId_inscripcion());
        dto.setId_estudiante(ins.getEstudiante().getId());
        dto.setId_curso(ins.getCurso().getId_curso());
        dto.setNombre_estudiante(ins.getEstudiante().getPersona().getNombre());
        dto.setNombre_curso(ins.getCurso().getNombre_curso());
        dto.setFecha_inscripcion(ins.getFecha_inscripcion());
        return dto;
    }

    /**
     * Cuenta el total de Inscripciones registrados.
     *
     * @return Número total de Inscripciones.
     */
        public long countAll() {
        log.info("Contando todos las inscripciones");
            long count = cursoRepository.count();
        log.info("Total de inscripciones: {}", count);
    return count;
}
}
