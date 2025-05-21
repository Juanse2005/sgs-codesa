package com.codesa.backend.dto;

import lombok.Data;

@Data
public class CursoDTO {
    private Long id_curso;
    private String nombre;
    private String descripcion;
    private int creditos;
    private Long id_profesor;
}
