/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.model;

/**
 *
 * @author Tapanes
 */
public enum EstadosModelo {
    DIGITACION(1), VALIDADO_ERRORES(2), VALIDADO_SIN_ERRORES(3);

    private final int value;

    private EstadosModelo(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static EstadosModelo fromValue(int value) {
        for (EstadosModelo e : values()) {
            if (e.getValue() == value) {
                return e;
            }
        }
        return null;
    }
}
