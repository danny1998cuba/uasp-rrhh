/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.submodel;

import com.uasp.hhrr.model.Cargo;
import com.uasp.hhrr.model.Trabajador;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Tapanes
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TrabajadorSalario {

    private Cargo cargo;
    private Trabajador trabajador;
    private String departamento;

    private int aprobada;
    private int cubierta;

    private Double nocturnidad;
    private Double cla;
    private Double maestriaDoctorado;
    private Double docencia;

}
