/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.exceptions;

/**
 *
 * @author Tapanes
 */
public class NivelEscolarMinReqExcception extends Exception {

    public NivelEscolarMinReqExcception() {
        super("El trabajador no posee el nivel escolar mínimo requerido para el cargo.");
    }
    
}
