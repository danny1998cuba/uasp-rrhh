/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.submodel;

import com.uasp.hhrr.model.Ausencias;
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
public class Ausentismo {

    private String catOcupName;

    private long plantillaAprob;
    private long plantillaCubierta;
    private long mujeres;

    private Ausencias au;
}
