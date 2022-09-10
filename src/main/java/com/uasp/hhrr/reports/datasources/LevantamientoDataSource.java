/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.datasources;

import com.uasp.hhrr.reports.submodel.LevantamientoRep;
import java.util.List;

/**
 *
 * @author Tapanes
 */
public class LevantamientoDataSource extends CustomDataSource<LevantamientoRep> {

    @Override
    public Object getFieldValue(String key) {
        switch (key) {
            case "categoria":
                return list.get(index).getCatOcupName();
            case "trabajadores":
                return list.get(index).getTrabajadores();
            case "mision":
                return list.get(index).getMision();
            case "lev":
                return list.get(index).getLev();
            default:
                return null;
        }
    }

    public List<LevantamientoRep> getList() {
        return list;
    }

}
