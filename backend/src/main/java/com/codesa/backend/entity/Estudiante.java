package com.codesa.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
@Entity
@Data
public class Estudiante {

    @Id
    private Long id;

    @OneToOne
    @MapsId 
    @JoinColumn(name = "id_persona")
    private Persona persona;

    @NotBlank
    @Column(unique = true)
    private String numero_matricula;

    @NotBlank
    private String grado;
}
