package com.codesa.backend.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateInscripcionDTO {
    @NotNull
    private Long id_estudiante;
    
    @NotNull
    private Long id_curso;

     @NotNull
    private LocalDate fecha_inscripcion;
}
