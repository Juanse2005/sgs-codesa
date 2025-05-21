package com.codesa.backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class AdministrativoDTO {
    private Long id_persona;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private LocalDate fecha_nacimiento;
    private String cargo;
    private String departamento;
}
