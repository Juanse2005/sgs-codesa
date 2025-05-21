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
import org.modelmapper.ModelMapper;
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

    @Autowired
    private ModelMapper modelMapper;

    public Page<InscripcionDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return inscripcionRepository.findAll(pageable)
                .map(this::toDTO);
    }

    public InscripcionDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("inscripcion no encontrada"));
        return toDTO(inscripcion);
    }

    public InscripcionDTO create(CreateInscripcionDTO input) {
        log.info("Creando inscripción");

        Estudiante estudiante = estudianteRepository.findById(input.getId_estudiante())
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado"));

        Curso curso = cursoRepository.findById(input.getId_curso())
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado"));

        Inscripcion ins = new Inscripcion();
        ins.setEstudiante(estudiante);
        ins.setCurso(curso);
        ins.setFecha_inscripcion(input.getFecha_inscripcion());

        Inscripcion saved = inscripcionRepository.save(ins);

        return toDTO(saved);
    }

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

    public void delete(Long id) {
        log.warn("Eliminando inscripcion con ID {}", id);

        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("inscripcion no encontrada"));
        inscripcionRepository.delete(inscripcion);
    }

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
}
