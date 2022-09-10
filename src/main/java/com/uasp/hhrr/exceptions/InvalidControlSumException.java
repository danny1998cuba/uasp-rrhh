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
public class InvalidControlSumException extends Exception {

    public InvalidControlSumException() {
        super("Existen contradicciones entre los datos ingresados y los almacenados.");
    }

    public InvalidControlSumException(String msg) {
        super("Existen contradicciones entre los datos ingresados y los almacenados: " + msg);
    }

}
