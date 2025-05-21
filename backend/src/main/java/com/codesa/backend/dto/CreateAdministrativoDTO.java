package com.codesa.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateAdministrativoDTO {
    @NotNull
    private Long id_persona;

    @NotBlank
    private String cargo;

    @NotBlank
    private String departamento;
}
