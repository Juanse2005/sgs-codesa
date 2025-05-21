package com.codesa.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codesa.backend.entity.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    
}
