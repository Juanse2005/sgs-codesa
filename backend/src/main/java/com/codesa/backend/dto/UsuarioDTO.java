package com.codesa.backend.dto;

import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id_usuario;
    private Long id_persona;
    private String rol;
}
