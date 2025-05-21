package com.codesa.backend.dto;

import lombok.Data;
@Data
public class AdministrativoDTO extends PersonaDTO {
    private String cargo;
    private String departamento;
}
