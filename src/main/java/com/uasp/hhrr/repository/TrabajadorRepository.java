/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package com.uasp.hhrr.repository;

import com.uasp.hhrr.model.Trabajador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 *
 * @author Tapanes
 */
public interface TrabajadorRepository extends JpaRepository<Trabajador, Integer>, JpaSpecificationExecutor<Trabajador> {

    long countByIdDepartamentoIdAndIdCargoId(int idDepartamento, int idCargo);
}
