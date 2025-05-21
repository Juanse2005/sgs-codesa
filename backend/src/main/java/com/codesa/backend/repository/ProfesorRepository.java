package com.codesa.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.codesa.backend.entity.Persona;
import com.codesa.backend.entity.Profesor;

public interface ProfesorRepository extends JpaRepository<Profesor, Long> {

}
