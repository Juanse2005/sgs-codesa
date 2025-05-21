package com.codesa.backend.service;

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
    private ModelMapper modelMapper;

    public Page<EstudianteDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return estudianteRepository.findAll(pageable)
                .map(persona -> modelMapper.map(persona, EstudianteDTO.class));
    }

    public EstudianteDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("estudiante no encontrada"));
        return modelMapper.map(estudiante, EstudianteDTO.class);
    }

    public EstudianteDTO create(EstudianteDTO dto) {
        log.info("Creando estudiante");

        Estudiante estudiante = modelMapper.map(dto, Estudiante.class);
        return modelMapper.map(estudianteRepository.save(estudiante), EstudianteDTO.class);
    }

    public EstudianteDTO update(Long id, EstudianteDTO dto) {
        log.info("Actualizando estudiante con ID {}", id);

        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("estudiante no encontrada"));

        modelMapper.map(dto, estudiante);
        return modelMapper.map(estudianteRepository.save(estudiante), EstudianteDTO.class);
    }

    public void delete(Long id) {
        log.warn("Eliminando estudiante con ID {}", id);

        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("estudiante no encontrada"));
        estudianteRepository.delete(estudiante);
    }
}
