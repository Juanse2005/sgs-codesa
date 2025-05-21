package com.codesa.backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class InscripcionDTO {
    private Long id_inscripcion;
    private Long id_estudiante;
    private Long id_curso;
    private LocalDate fecha_inscripcion;
}
