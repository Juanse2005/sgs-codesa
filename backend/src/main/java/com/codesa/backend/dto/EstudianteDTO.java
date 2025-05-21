package com.codesa.backend.dto;

import lombok.Data;

@Data
public class EstudianteDTO extends PersonaDTO {
    private String numero_matricula;
    private String grado;
}
