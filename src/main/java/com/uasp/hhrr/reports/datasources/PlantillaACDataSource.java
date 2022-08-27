/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.datasources;

import com.uasp.hhrr.reports.submodel.PlantillaAprobadaCubierta;

/**
 *
 * @author Tapanes
 */
public class PlantillaACDataSource extends CustomDataSource<PlantillaAprobadaCubierta> {

    @Override
    public Object getFieldValue(String key) {
        switch (key) {
            case "nombre":
                return list.get(index).getNombre();
            case "totalPlazas":
                return list.get(index).getTotalPlazas();
            case "totalCubiertas":
                return list.get(index).getTotalCubiertas();
            case "totalMision":
                return list.get(index).getTotalMision();
            case "parent":
                return list.get(index).isParent();
            default:
                return null;
        }
    }

}
