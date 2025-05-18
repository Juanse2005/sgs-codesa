package com.codesa.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data

public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_persona;

    @NotBlank
    private String nombre;

    @NotBlank
    private String apellido;

    @NotNull
    @PastOrPresent
    private LocalDate fecha_nacimiento;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;
    
    @NotBlank
    private String password;

    @NotBlank
    @Pattern(regexp = "\\d{10}")
    private String telefono;

}
