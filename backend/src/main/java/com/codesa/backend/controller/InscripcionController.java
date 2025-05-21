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

import com.codesa.backend.dto.InscripcionDTO;
import com.codesa.backend.service.InscripcionService;


import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/inscripcion")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Inscripciones")

public class InscripcionController {
    
    private final InscripcionService inscripcionService;

    @GetMapping
    public Page<InscripcionDTO> listar(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return inscripcionService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InscripcionDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(inscripcionService.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<InscripcionDTO> obtenerPorQuery(@RequestParam("id_inscripcion") Long idinscripcion) {
        return ResponseEntity.ok(inscripcionService.getById(idinscripcion));
    }

    @PostMapping
    public ResponseEntity<InscripcionDTO> crear(@Valid @RequestBody InscripcionDTO inscripcionDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(inscripcionService.create(inscripcionDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InscripcionDTO> actualizar(@PathVariable Long id, @Valid @RequestBody InscripcionDTO inscripcionDTO) {
        return ResponseEntity.ok(inscripcionService.update(id, inscripcionDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        inscripcionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
