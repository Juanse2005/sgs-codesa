package com.codesa.backend.dto;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PersonaDTO {

    private Long id_persona;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private LocalDate fecha_nacimiento;

}
