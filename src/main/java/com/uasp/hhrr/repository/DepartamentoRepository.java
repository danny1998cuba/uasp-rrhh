/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package com.uasp.hhrr.repository;

import com.uasp.hhrr.model.Departamento;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Tapanes
 */
public interface DepartamentoRepository extends JpaRepository<Departamento, Integer> {

    @Query("Select d from Departamento d where d.idUnidad.id = :idUnidad")
    public List<Departamento> findByIdUnidad(@Param(value = "idUnidad") int idUnidad);
    
    @Query("Select d from Departamento d where d.idUnidad.id = :idUnidad and d.nombre = :nombre")
    public Departamento findByIdUnidadAndNombre(@Param(value = "idUnidad") int idUnidad, @Param(value = "nombre") String nombre);
    
}
