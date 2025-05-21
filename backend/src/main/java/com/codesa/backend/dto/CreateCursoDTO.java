package com.codesa.backend.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateCursoDTO {

    @NotBlank
    private String nombre_curso;

    @NotBlank
    private String descripcion;

    @NotNull
    private Integer creditos;

    @NotNull
    private Long id_profesor;
}
