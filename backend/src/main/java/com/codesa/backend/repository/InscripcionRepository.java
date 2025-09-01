package com.codesa.backend.repository;

import com.codesa.backend.entity.Curso;
import com.codesa.backend.entity.Estudiante;
import com.codesa.backend.entity.Inscripcion;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {
    
    /**
     * Obtiene todas las inscripciones paginadas y ordenadas por su ID de forma ascendente.
     * @param pageable Objeto {@link Pageable} que define la paginación y el tamaño de página.
     */
    @Query("SELECT i FROM Inscripcion i ORDER BY i.id_inscripcion ASC")
    Page<Inscripcion> findAllOrderedById(Pageable pageable);

    /**
     * Verifica si existe un registro asociado a un {@link Estudiante} específico.
     * 
     * @param estudiante La persona que se quiere verificar en la base de datos.
     */
    boolean existsByEstudianteAndCurso(Estudiante estudiante, Curso curso);
}


