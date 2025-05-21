package com.codesa.backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CursoDTO {
    // Curso
    private Long id_curso;
    private String nombre_curso;
    private String descripcion;
    private Integer creditos;

    // Profesor
    private Long id_profesor;
    private String especialidad;
    private LocalDate fecha_contratacion;

    // Persona
    private String nombre_persona;
    private String apellido;
    private String email;
    private String telefono;
    private LocalDate fecha_nacimiento;
}
