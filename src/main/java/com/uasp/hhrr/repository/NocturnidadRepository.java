/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package com.uasp.hhrr.repository;

import com.uasp.hhrr.model.Nocturnidades;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Tapanes
 */
public interface NocturnidadRepository extends JpaRepository<Nocturnidades, Integer> {

    @Query(value = "SELECT a FROM Nocturnidades AS a WHERE MONTH(a.fecha) = :month AND YEAR(a.fecha) = :year")
    List<Nocturnidades> findByMes(@Param("year") int year, @Param("month") int month);

    @Query(value = "SELECT a FROM Nocturnidades AS a WHERE MONTH(a.fecha) = :month AND YEAR(a.fecha) = :year AND a.idTrabajador.idDepartamento.idUnidad.id = :unidad")
    List<Nocturnidades> findByMesAndUnidad(@Param("year") int year, @Param("month") int month, @Param("unidad") int unidad);
}
