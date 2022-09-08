/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package com.uasp.hhrr.repository;

import com.uasp.hhrr.model.Ausencias;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Tapanes
 */
public interface AusenciasRepository extends JpaRepository<Ausencias, Integer> {
    
    @Query(value = "SELECT * FROM ausencias AS a WHERE MONTH(a.fecha) = :month AND YEAR(a.fecha) = :year", nativeQuery = true)
    List<Ausencias> findByMes(@Param("year") int year, @Param("month") int month);

}
