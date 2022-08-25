/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package com.uasp.hhrr.repository;

import com.uasp.hhrr.model.DepartamentoCargo;
import com.uasp.hhrr.model.DepartamentoCargoPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Tapanes
 */
public interface DepartamentoCargoRepostory
        extends JpaRepository<DepartamentoCargo, DepartamentoCargoPK> {

    @Query(value = "SELECT SUM(dc.plazas) "
            + "FROM departamento_cargo AS dc",
            nativeQuery = true)
    Long countPlazas();

    @Query(value = "SELECT COALESCE(SUM(dc.plazas), 0) "
            + "FROM categoria_ocupacional AS o "
            + "JOIN cargo AS c ON o.id = c.id_cat_ocup "
            + "JOIN departamento_cargo AS dc ON c.id = dc.Cargoid "
            + "WHERE o.abreviado = :co",
            nativeQuery = true)
    Long plazasByCatOcupAbrev(@Param(value = "co") String abreviado);
    
    @Query(value = "SELECT COALESCE(SUM(dc.plazas), 0) "
            + "FROM categoria_ocupacional AS o "
            + "JOIN cargo AS c ON o.id = c.id_cat_ocup "
            + "JOIN departamento_cargo AS dc ON c.id = dc.Cargoid "
            + "WHERE o.id = :co",
            nativeQuery = true)
    Long plazasByCatOcupId(@Param(value = "co") int id);
}
