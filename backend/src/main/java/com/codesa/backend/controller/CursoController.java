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

import com.codesa.backend.dto.CreateCursoDTO;
import com.codesa.backend.dto.CursoDTO;
import com.codesa.backend.dto.EstudianteDTO;
import com.codesa.backend.service.CursoService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/curso")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Cursos")

public class CursoController {

    private final CursoService cursoService;

    @GetMapping
    public Page<CursoDTO> listar(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return cursoService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CursoDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(cursoService.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<CursoDTO> obtenerPorQuery(@RequestParam("id_curso") Long idcurso) {
        return ResponseEntity.ok(cursoService.getById(idcurso));
    }

    @PostMapping
    public ResponseEntity<CursoDTO> crear(
        @Valid @RequestBody CreateCursoDTO input) {
        CursoDTO salida = cursoService.create(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(salida);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CursoDTO> actualizar(@PathVariable Long id, 
    @Valid @RequestBody CreateCursoDTO input) {
        return ResponseEntity.ok(cursoService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        cursoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
