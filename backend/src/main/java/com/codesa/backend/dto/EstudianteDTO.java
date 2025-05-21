package com.codesa.backend.dto;

import java.time.LocalDate;

import com.codesa.backend.entity.Persona;

import lombok.Data;

@Data
public class EstudianteDTO {
    private Long id_persona;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private LocalDate fecha_nacimiento;
    private String numero_matricula;
    private String grado;
}
