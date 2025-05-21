package com.codesa.backend.service;

import com.codesa.backend.dto.ProfesorDTO;
import com.codesa.backend.entity.Profesor;
import com.codesa.backend.exception.ResourceNotFoundException;
import com.codesa.backend.repository.ProfesorRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
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
    private ModelMapper modelMapper;

    public Page<ProfesorDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return profesorRepository.findAll(pageable)
                .map(persona -> modelMapper.map(persona, ProfesorDTO.class));
    }

    public ProfesorDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Profesor profesor = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("profesor no encontrada"));
        return modelMapper.map(profesor, ProfesorDTO.class);
    }

    public ProfesorDTO create(ProfesorDTO dto) {
        log.info("Creando profesor");

        Profesor profesor = modelMapper.map(dto, Profesor.class);
        return modelMapper.map(profesorRepository.save(profesor), ProfesorDTO.class);
    }

    public ProfesorDTO update(Long id, ProfesorDTO dto) {
        log.info("Actualizando profesor con ID {}", id);

        Profesor profesor = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("profesor no encontrada"));

        modelMapper.map(dto, profesor);
        return modelMapper.map(profesorRepository.save(profesor), ProfesorDTO.class);
    }

    public void delete(Long id) {
        log.warn("Eliminando profesor con ID {}", id);

        Profesor profesor = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("profesor no encontrada"));
        profesorRepository.delete(profesor);
    }
}
