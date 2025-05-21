package com.codesa.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;

@Entity
@Data

public class Profesor {
    @Id
    private Long id;
    
    @OneToOne
    @MapsId
    @JoinColumn(name = "id_persona")
    private Persona persona;

    @NotBlank
    private String especialidad;

    @NotNull
    @PastOrPresent
    private LocalDate fecha_contratacion;
}
