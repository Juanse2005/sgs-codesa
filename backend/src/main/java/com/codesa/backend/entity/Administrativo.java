package com.codesa.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data

public class Administrativo extends Persona {
    @NotBlank
    private String cargo;

    @NotBlank
    private String departamento;
}
