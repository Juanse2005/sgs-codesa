package com.codesa.backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ProfesorDTO extends PersonaDTO{
    
    private String especialidad;
    private LocalDate fecha_contratacion;
}
