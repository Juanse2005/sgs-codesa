package com.codesa.backend.repository;

import com.codesa.backend.entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
    
    /**
     * Obtiene todas las personas paginadas y ordenadas por su ID de forma ascendente.
     * @param pageable Objeto {@link Pageable} que define la paginación y el tamaño de página.
     */
    @Query("SELECT p FROM Persona p ORDER BY p.id_persona ASC")
    Page<Persona> findAllOrderedById(Pageable pageable);

    /**
     * Busca una persona por su correo electrónico.
     * @param email El correo electrónico de la persona a buscar.
     */
    Optional<Persona> findByEmail(String email);

    /**
     * Verifica si existe alguna persona con un correo electrónico específico.
     * @param email El correo electrónico a verificar.
     */
    boolean existsByEmail(String email);
}
