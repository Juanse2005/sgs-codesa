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

import com.codesa.backend.dto.CountDTO;
import com.codesa.backend.dto.CreateEstudianteDTO;
import com.codesa.backend.dto.EstudianteDTO;
import com.codesa.backend.service.EstudianteService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/estudiantes")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Estudiantes")

public class EstudiantesController {

    private final EstudianteService estudianteService;

    @GetMapping
    public Page<EstudianteDTO> listar(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return estudianteService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstudianteDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(estudianteService.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<EstudianteDTO> obtenerPorQuery(@RequestParam("id_Estudiante") Long idEstudiante) {
        return ResponseEntity.ok(estudianteService.getById(idEstudiante));
    }

    @PostMapping
    public ResponseEntity<EstudianteDTO> crear(
            @Valid @RequestBody CreateEstudianteDTO input) {
        EstudianteDTO salida = estudianteService.create(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(salida);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EstudianteDTO> actualizar(@PathVariable Long id,
            @Valid @RequestBody CreateEstudianteDTO input) {
        return ResponseEntity.ok(estudianteService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        estudianteService.delete(id);
        return ResponseEntity.noContent().build();
    }

      @GetMapping("/count")
    public ResponseEntity<CountDTO> obtenerConteo() {
        long total = estudianteService.countAll();
        CountDTO response = new CountDTO(total);
        return ResponseEntity.ok(response);
    }
}
