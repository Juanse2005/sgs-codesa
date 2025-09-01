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

import com.codesa.backend.dto.AdministrativoDTO;
import com.codesa.backend.dto.CountDTO;
import com.codesa.backend.dto.CreateAdministrativoDTO;
import com.codesa.backend.service.AdministrativoService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/administrativo")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Administrativos")

public class AdministrativoController {

    private final AdministrativoService administrativoService;

    @GetMapping
    public Page<AdministrativoDTO> listar(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return administrativoService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdministrativoDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(administrativoService.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<AdministrativoDTO> obtenerPorQuery(@RequestParam("id_administrativo") Long idadministrativo) {
        return ResponseEntity.ok(administrativoService.getById(idadministrativo));
    }

    @PostMapping
    public ResponseEntity<AdministrativoDTO> crear(
            @Valid @RequestBody CreateAdministrativoDTO input) {
        AdministrativoDTO salida = administrativoService.create(input);

        return ResponseEntity.status(HttpStatus.CREATED).body(salida);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdministrativoDTO> actualizar(@PathVariable Long id,
            @Valid @RequestBody CreateAdministrativoDTO input) {
        return ResponseEntity.ok(administrativoService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        administrativoService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/count")
    public ResponseEntity<CountDTO> obtenerConteo() {
        long total = administrativoService.countAll();
        CountDTO response = new CountDTO(total);
        return ResponseEntity.ok(response);
    }
}
