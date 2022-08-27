/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.datasources;

import com.uasp.hhrr.reports.submodel.PlantillaAprobadaCubierta;
import java.util.ArrayList;
import java.util.List;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRField;

/**
 *
 * @author Tapanes
 */
public class PlantillaACDataSource implements JRDataSource {

    private final List<PlantillaAprobadaCubierta> list = new ArrayList<>();
    private int index = -1;

    public boolean add(PlantillaAprobadaCubierta p) {
        return this.list.add(p);
    }

    public boolean addAll(List<PlantillaAprobadaCubierta> list) {
        return this.list.addAll(list);
    }

    @Override
    public boolean next() throws JRException {
        return ++index < list.size();
    }

    @Override
    public Object getFieldValue(JRField jrf) throws JRException {
        Object valor = null;

        if (jrf.getName() != null) {
            switch (jrf.getName()) {
                case "nombre":
                    valor = list.get(index).getNombre();
                    break;
                case "totalPlazas":
                    valor = list.get(index).getTotalPlazas();
                    break;
                case "totalCubiertas":
                    valor = list.get(index).getTotalCubiertas();
                    break;
                case "totalMision":
                    valor = list.get(index).getTotalMision();
                    break;
                case "parent":
                    valor = list.get(index).isParent();
                    break;
                default:
                    break;
            }
        }

        return valor;
    }

}
