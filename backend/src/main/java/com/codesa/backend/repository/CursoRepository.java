package com.codesa.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.codesa.backend.entity.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {

    /**
     * Obtiene todas los Cursos paginados y ordenadas por su ID de forma ascendente.
     * @param pageable Objeto {@link Pageable} que define la paginación y el tamaño de página.
     */
    @Query("SELECT c FROM Curso c ORDER BY c.id_curso ASC")
    Page<Curso> findAllOrderedById(Pageable pageable);


}
