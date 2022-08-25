/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.submodel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Tapanes
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PlantillaAprobadaCubierta {

    private boolean parent;
    private String abreviado;
    private String nombre;
    private long totalPlazas;
    private long totalCubiertas;
    private long totalMision;

}
