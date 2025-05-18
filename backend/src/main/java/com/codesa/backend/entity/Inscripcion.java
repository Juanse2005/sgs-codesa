package com.codesa.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;

@Entity
@Data
public class Inscripcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_inscripcion;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_estudiante")
    private Estudiante estudiante;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_curso")
    private Curso curso;

    @NotNull
    @PastOrPresent
    private LocalDate fecha_inscripcion;
}
