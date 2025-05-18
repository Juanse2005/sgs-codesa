package com.codesa.backend.entity;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;

@Entity
@Data

public class Profesor extends Persona {
    @NotBlank
    private String especialidad;

    @NotBlank
    @PastOrPresent
    private String fecha_contratacion;
}
