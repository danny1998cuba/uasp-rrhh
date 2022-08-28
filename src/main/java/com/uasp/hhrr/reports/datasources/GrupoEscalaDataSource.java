/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.datasources;

import com.uasp.hhrr.reports.submodel.GrupoEscala;

/**
 *
 * @author Tapanes
 */
public class GrupoEscalaDataSource extends CustomDataSource<GrupoEscala> {

    @Override
    public Object getFieldValue(String key) {
        switch (key) {
            case "grupo":
                return list.get(index).getGrupo();
            case "opTot":
                return list.get(index).getOpTot();
            case "opMuj":
                return list.get(index).getOpMuj();
            case "serTot":
                return list.get(index).getSerTot();
            case "serMuj":
                return list.get(index).getSerMuj();
            case "adTot":
                return list.get(index).getAdTot();
            case "adMuj":
                return list.get(index).getAdMuj();
            case "tecTot":
                return list.get(index).getTecTot();
            case "tecMuj":
                return list.get(index).getTecMuj();
            case "cuadTot":
                return list.get(index).getCuadTot();
            case "cuadMuj":
                return list.get(index).getCuadMuj();
            default:
                return null;
        }
    }

}
