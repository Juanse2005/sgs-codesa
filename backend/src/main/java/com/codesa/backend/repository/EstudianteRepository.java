package com.codesa.backend.repository;

import com.codesa.backend.entity.Estudiante;
import com.codesa.backend.entity.Persona;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
    
    /**
     * Obtiene todas los estudiantes paginados y ordenados por su ID de forma ascendente.
     * @param pageable Objeto {@link Pageable} que define la paginación y el tamaño de página.
     */
    @Query("SELECT e FROM Estudiante e ORDER BY e.persona.id ASC")
    Page<Estudiante> findAllOrderedById(Pageable pageable);

    /**
     * Verifica si existe un registro asociado a una {@link Persona} específica.
     * 
     * @param persona La persona que se quiere verificar en la base de datos.
     */
    boolean existsByPersona(Persona persona);
}


