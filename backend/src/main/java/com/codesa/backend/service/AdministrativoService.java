package com.codesa.backend.service;

import com.codesa.backend.dto.AdministrativoDTO;
import com.codesa.backend.entity.Administrativo;
import com.codesa.backend.exception.ResourceNotFoundException;
import com.codesa.backend.repository.AdministrativoRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

@Service
@Slf4j
public class AdministrativoService {
    @Autowired
    private AdministrativoRepository administrativoRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Page<AdministrativoDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return administrativoRepository.findAll(pageable)
                .map(persona -> modelMapper.map(persona, AdministrativoDTO.class));
    }

    public AdministrativoDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Administrativo administrativo = administrativoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("administrativo no encontrada"));
        return modelMapper.map(administrativo, AdministrativoDTO.class);
    }

    public AdministrativoDTO create(AdministrativoDTO dto) {
        log.info("Creando administrativo");

        Administrativo administrativo = modelMapper.map(dto, Administrativo.class);
        return modelMapper.map(administrativoRepository.save(administrativo), AdministrativoDTO.class);
    }

    public AdministrativoDTO update(Long id, AdministrativoDTO dto) {
        log.info("Actualizando administrativo con ID {}", id);

        Administrativo administrativo = administrativoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("administrativo no encontrada"));

        modelMapper.map(dto, administrativo);
        return modelMapper.map(administrativoRepository.save(administrativo), AdministrativoDTO.class);
    }

    public void delete(Long id) {
        log.warn("Eliminando administrativo con ID {}", id);

        Administrativo administrativo = administrativoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("administrativo no encontrada"));
        administrativoRepository.delete(administrativo);
    }
}
