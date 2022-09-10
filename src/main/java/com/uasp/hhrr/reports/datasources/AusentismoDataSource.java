/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.datasources;

import com.uasp.hhrr.reports.submodel.Ausentismo;
import java.util.List;

/**
 *
 * @author Tapanes
 */
public class AusentismoDataSource extends CustomDataSource<Ausentismo> {

    @Override
    public Object getFieldValue(String key) {
        switch (key) {
            case "categoria":
                return list.get(index).getCatOcupName();
            case "aprobada":
                return list.get(index).getPlantillaAprob();
            case "cubierta":
                return list.get(index).getPlantillaCubierta();
            case "mujeres":
                return list.get(index).getMujeres();
            case "ausencias":
                return list.get(index).getAu();
            default:
                return null;
        }
    }

    public List<Ausentismo> getList() {
        return list;
    }
}
