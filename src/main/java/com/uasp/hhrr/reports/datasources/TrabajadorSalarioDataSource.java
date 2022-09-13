/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.datasources;

import com.uasp.hhrr.reports.submodel.TrabajadorSalario;

/**
 *
 * @author Tapanes
 */
public class TrabajadorSalarioDataSource extends CustomDataSource<TrabajadorSalario> {

    @Override
    public Object getFieldValue(String key) {
        switch (key) {
            case "cargo":
                return list.get(index).getCargo();
            case "trabajador":
                return list.get(index).getTrabajador();
            case "nocturnidad":
                return list.get(index).getNocturnidad();
            case "cla":
                return list.get(index).getCla();
            case "maestria_doctorado":
                return list.get(index).getMaestriaDoctorado();
            case "docencia":
                return list.get(index).getDocencia();
            case "aprobada":
                return list.get(index).getAprobada();
            case "cubierta":
                return list.get(index).getCubierta();
            case "departamento":
                return list.get(index).getDepartamento();
            default:
                return null;
        }
    }
}
