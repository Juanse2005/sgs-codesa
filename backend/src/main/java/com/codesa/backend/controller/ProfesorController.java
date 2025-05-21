package com.codesa.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codesa.backend.dto.ProfesorDTO;
import com.codesa.backend.service.ProfesorService;


import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/profesor")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Profesores")

public class ProfesorController {
    
    private final ProfesorService profesorService;

    @GetMapping
    public Page<ProfesorDTO> listar(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return profesorService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfesorDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(profesorService.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<ProfesorDTO> obtenerPorQuery(@RequestParam("id_profesor") Long idprofesor) {
        return ResponseEntity.ok(profesorService.getById(idprofesor));
    }

    @PostMapping
    public ResponseEntity<ProfesorDTO> crear(@Valid @RequestBody ProfesorDTO profesorDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(profesorService.create(profesorDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfesorDTO> actualizar(@PathVariable Long id, @Valid @RequestBody ProfesorDTO profesorDTO) {
        return ResponseEntity.ok(profesorService.update(id, profesorDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        profesorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
