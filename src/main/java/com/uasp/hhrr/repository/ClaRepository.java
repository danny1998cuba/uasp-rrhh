/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package com.uasp.hhrr.repository;

import com.uasp.hhrr.model.Cla;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Tapanes
 */
public interface ClaRepository extends JpaRepository<Cla, Integer> {
    
}
