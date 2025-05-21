package com.codesa.backend.service;

import com.codesa.backend.dto.AdministrativoDTO;
import com.codesa.backend.dto.CreateAdministrativoDTO;
import com.codesa.backend.dto.EstudianteDTO;
import com.codesa.backend.entity.Administrativo;
import com.codesa.backend.entity.Estudiante;
import com.codesa.backend.entity.Persona;
import com.codesa.backend.exception.ResourceNotFoundException;
import com.codesa.backend.repository.AdministrativoRepository;
import com.codesa.backend.repository.PersonaRepository;

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
    private PersonaRepository personaRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Page<AdministrativoDTO> getAll(Pageable pageable) {
        log.info("Obteniendo todas las personas");
        return administrativoRepository.findAll(pageable)
                .map(this::toDTO);
    }

    public AdministrativoDTO getById(Long id) {
        log.info("Obteniendo persona con ID {}", id);
        Administrativo administrativo = administrativoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("administrativo no encontrada"));
        return toDTO(administrativo);
    }

    public AdministrativoDTO create(CreateAdministrativoDTO input) {
        log.info("Creando administrativo");

         Persona persona = personaRepository.findById(input.getId_persona())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        Administrativo est = new Administrativo();
        est.setPersona(persona);
        est.setCargo(input.getCargo());
        est.setDepartamento(input.getDepartamento());
        Administrativo saved = administrativoRepository.save(est);

        return toDTO(saved);
    }

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

    public void delete(Long id) {
        log.warn("Eliminando administrativo con ID {}", id);

        Administrativo administrativo = administrativoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("administrativo no encontrada"));
        administrativoRepository.delete(administrativo);
    }

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

}
