package com.codesa.backend.service;

import com.codesa.backend.dto.InscripcionDTO;
import com.codesa.backend.entity.Inscripcion;
import com.codesa.backend.exception.ResourceNotFoundException;
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
    private ModelMapper modelMapper;

    public Page<InscripcionDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return inscripcionRepository.findAll(pageable)
                .map(persona -> modelMapper.map(persona, InscripcionDTO.class));
    }

    public InscripcionDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("inscripcion no encontrada"));
        return modelMapper.map(inscripcion, InscripcionDTO.class);
    }

    public InscripcionDTO create(InscripcionDTO dto) {
        log.info("Creando inscripcion");

        Inscripcion inscripcion = modelMapper.map(dto, Inscripcion.class);
        return modelMapper.map(inscripcionRepository.save(inscripcion), InscripcionDTO.class);
    }

    public InscripcionDTO update(Long id, InscripcionDTO dto) {
        log.info("Actualizando inscripcion con ID {}", id);

        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("inscripcion no encontrada"));

        modelMapper.map(dto, inscripcion);
        return modelMapper.map(inscripcionRepository.save(inscripcion), InscripcionDTO.class);
    }

    public void delete(Long id) {
        log.warn("Eliminando inscripcion con ID {}", id);

        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("inscripcion no encontrada"));
        inscripcionRepository.delete(inscripcion);
    }
}
