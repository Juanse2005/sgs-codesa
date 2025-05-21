package com.codesa.backend.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateProfesorDTO {
    @NotNull
    private Long id_persona;

    @NotBlank
    private String especialidad;

    @NotNull
    private LocalDate fecha_contratacion;
}
