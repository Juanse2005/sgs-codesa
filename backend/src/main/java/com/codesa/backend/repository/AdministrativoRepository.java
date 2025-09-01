package com.codesa.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.codesa.backend.entity.Administrativo;
import com.codesa.backend.entity.Persona;

public interface AdministrativoRepository extends JpaRepository<Administrativo, Long> {
        
        /**
         * Obtiene todas los administrativos paginados y ordenados por su ID de forma ascendente.
         * @param pageable Objeto {@link Pageable} que define la paginación y el tamaño de página.
         */
        @Query("SELECT p FROM Administrativo p ORDER BY p.persona.id ASC")
        Page<Administrativo> findAllOrderedById(Pageable pageable);


        /**
         * Verifica si existe un registro asociado a una {@link Persona} específica.
         * 
         * @param persona La persona que se quiere verificar en la base de datos.
         */
        boolean existsByPersona(Persona persona);
}
