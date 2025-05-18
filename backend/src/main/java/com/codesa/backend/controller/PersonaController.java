package com.codesa.backend.controller;

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

import com.codesa.backend.dto.PersonaDTO;
import com.codesa.backend.service.PersonaService;
import java.util.List;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/personas")
@RequiredArgsConstructor
@Slf4j
public class PersonaController {

    private final PersonaService personaService;

    @GetMapping
    public List<PersonaDTO> listar() {
        return personaService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonaDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(personaService.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<PersonaDTO> obtenerPorQuery(@RequestParam("id_persona") Long idPersona) {
        return ResponseEntity.ok(personaService.getById(idPersona));
    }

    @PostMapping
    public ResponseEntity<PersonaDTO> crear(@Valid @RequestBody PersonaDTO personaDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(personaService.create(personaDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonaDTO> actualizar(@PathVariable Long id, @Valid @RequestBody PersonaDTO personaDTO) {
        return ResponseEntity.ok(personaService.update(id, personaDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        personaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
