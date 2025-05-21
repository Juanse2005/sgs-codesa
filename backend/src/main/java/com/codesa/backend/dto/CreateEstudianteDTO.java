package com.codesa.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// Para recibir sólo lo mínimo en el POST
@Data
public class CreateEstudianteDTO {
    @NotNull
    private Long id_persona;

    @NotBlank
    private String numero_matricula;

    @NotBlank
    private String grado;
}
