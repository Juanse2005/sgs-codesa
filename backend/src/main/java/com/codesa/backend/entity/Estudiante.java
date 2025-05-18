package com.codesa.backend.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data

public class Estudiante extends Persona {
   @NotBlank
   @Column(unique = true)
   private String numero_matricula;

   @NotBlank
    private String grado;
}
