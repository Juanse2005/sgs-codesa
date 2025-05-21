package com.codesa.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codesa.backend.entity.Administrativo;

public interface AdministrativoRepository extends JpaRepository<Administrativo, Long> {
    
}
