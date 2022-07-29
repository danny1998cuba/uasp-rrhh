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
public class PlazasDisponiblesException extends Exception {

    public PlazasDisponiblesException() {
        super("No existen plazas disponibles para el cargo en el departamento");
    }
   
}
