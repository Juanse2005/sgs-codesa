package com.codesa.backend.service;

import com.codesa.backend.dto.CursoDTO;
import com.codesa.backend.entity.Curso;
import com.codesa.backend.exception.ResourceNotFoundException;
import com.codesa.backend.repository.CursoRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

@Service
@Slf4j
public class CursoService {
    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Page<CursoDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return cursoRepository.findAll(pageable)
                .map(persona -> modelMapper.map(persona, CursoDTO.class));
    }

    public CursoDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("curso no encontrada"));
        return modelMapper.map(curso, CursoDTO.class);
    }

    public CursoDTO create(CursoDTO dto) {
        log.info("Creando curso");

        Curso curso = modelMapper.map(dto, Curso.class);
        return modelMapper.map(cursoRepository.save(curso), CursoDTO.class);
    }

    public CursoDTO update(Long id, CursoDTO dto) {
        log.info("Actualizando curso con ID {}", id);

        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("curso no encontrada"));

        modelMapper.map(dto, curso);
        return modelMapper.map(cursoRepository.save(curso), CursoDTO.class);
    }

    public void delete(Long id) {
        log.warn("Eliminando curso con ID {}", id);

        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("curso no encontrada"));
        cursoRepository.delete(curso);
    }
}
