/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.models;

import com.uasp.hhrr.model.NivelEscolar;
import com.uasp.hhrr.repository.DepartamentoCargoRepostory;
import com.uasp.hhrr.repository.NivelEscolarRepository;
import com.uasp.hhrr.repository.TrabajadorRepository;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author Tapanes
 */
@Component
public class F5205_02FillHelper {

    @Autowired
    TrabajadorRepository trabajadoresRepository;

    @Autowired
    DepartamentoCargoRepostory dcRepository;

    @Autowired
    NivelEscolarRepository neRepository;

    public void fillModel(F5205_02 model) {
        HashMap<String, Long> map = new HashMap<>();

        map.put(F5205_02.COLUMNS.TOTAL_TOTAL.getValue(), trabajadoresRepository.count());
        map.put(F5205_02.COLUMNS.MUJERES_TOTAL.getValue(), trabajadoresRepository.countBySexo("f"));
        map.put(F5205_02.COLUMNS.TOTAL_MAYORES.getValue(), trabajadoresRepository.countByMayorEdadLaboral());
        map.put(F5205_02.COLUMNS.MUJERES_MAYORES.getValue(), trabajadoresRepository.countByMayorEdadLaboralAndSexo("f"));
        map.put(F5205_02.COLUMNS.TOTAL_MENORES.getValue(), trabajadoresRepository.countByMenorEdadLaboral());
        map.put(F5205_02.COLUMNS.MUJERES_MENORES.getValue(), trabajadoresRepository.countByMenorEdadLaboralAndSexo("f"));
        map.put(F5205_02.COLUMNS.TOTAL_OPERARIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviado("O"));
        map.put(F5205_02.COLUMNS.MUJERES_OPERARIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexo("O", "f"));
        map.put(F5205_02.COLUMNS.TOTAL_SERVICIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviado("S"));
        map.put(F5205_02.COLUMNS.MUJERES_SERVICIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexo("S", "f"));
        map.put(F5205_02.COLUMNS.TOTAL_TECNICOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviado("T"));
        map.put(F5205_02.COLUMNS.MUJERES_TECNICOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexo("T", "f"));
        map.put(F5205_02.COLUMNS.TOTAL_ADMIN.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviado("A"));
        map.put(F5205_02.COLUMNS.MUJERES_ADMIN.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexo("A", "f"));
        map.put(F5205_02.COLUMNS.TOTAL_DIREC.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviado("C"));
        map.put(F5205_02.COLUMNS.MUJERES_DIREC.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexo("C", "f"));

        //Total ocupados y Jaruco
        for (F5205_02.COLUMNS c : F5205_02.COLUMNS.values()) {
            if (map.get(c.getValue()) != 0) {
                model.addData(F5205_02.FILAS.TOTAL_OCUPADOS, c, map.get(c.getValue()));
                model.addData(F5205_02.FILAS.JARUCO, c, map.get(c.getValue()));
            }
        }

//        //Vacantes 
//        model.addData(F5205_03.FILAS.TOTAL_VACANTES, F5205_03.COLUMNS.TOTAL_TOTAL, dcRepository.countPlazas() - map.get(F5205_03.COLUMNS.TOTAL_TOTAL.getValue()));
//        model.addData(F5205_03.FILAS.TOTAL_VACANTES, F5205_03.COLUMNS.TOTAL_OPERARIOS, dcRepository.plazasByCatOcup("O") - map.get(F5205_03.COLUMNS.TOTAL_OPERARIOS.getValue()));
//        model.addData(F5205_03.FILAS.TOTAL_VACANTES, F5205_03.COLUMNS.TOTAL_SERVICIOS, dcRepository.plazasByCatOcup("S") - map.get(F5205_03.COLUMNS.TOTAL_SERVICIOS.getValue()));
//        model.addData(F5205_03.FILAS.TOTAL_VACANTES, F5205_03.COLUMNS.TOTAL_TECNICOS, dcRepository.plazasByCatOcup("T") - map.get(F5205_03.COLUMNS.TOTAL_TECNICOS.getValue()));
//        model.addData(F5205_03.FILAS.TOTAL_VACANTES, F5205_03.COLUMNS.TOTAL_ADMIN, dcRepository.plazasByCatOcup("A") - map.get(F5205_03.COLUMNS.TOTAL_ADMIN.getValue()));
//        model.addData(F5205_03.FILAS.TOTAL_VACANTES, F5205_03.COLUMNS.TOTAL_DIREC, dcRepository.plazasByCatOcup("C") - map.get(F5205_03.COLUMNS.TOTAL_DIREC.getValue()));
        //Estudios
        boolean tm_flag = false;

        for (NivelEscolar n : neRepository.findAll()) {
            F5205_02.FILAS f = translateNivelEscolar(n);

            if (f == F5205_02.FILAS.TECNICO_MEDIO) {
                if (!tm_flag) {
                    tm_flag = true;

                    int otherTMId = otherTMId(n);

                    map.put(F5205_02.COLUMNS.TOTAL_TOTAL.getValue(), trabajadoresRepository.countByIdEscolarId(n.getId()) + trabajadoresRepository.countByIdEscolarId(otherTMId));
                    map.put(F5205_02.COLUMNS.MUJERES_TOTAL.getValue(), trabajadoresRepository.countBySexoAndIdEscolarId("f", n.getId()) + trabajadoresRepository.countBySexoAndIdEscolarId("f", otherTMId));
                    map.put(F5205_02.COLUMNS.TOTAL_MAYORES.getValue(), trabajadoresRepository.countByMayorEdadLaboralAndIdEscolar(n.getId()) + trabajadoresRepository.countByMayorEdadLaboralAndIdEscolar(otherTMId));
                    map.put(F5205_02.COLUMNS.MUJERES_MAYORES.getValue(), trabajadoresRepository.countByMayorEdadLaboralAndSexoAndIdEscolar("f", n.getId()) + trabajadoresRepository.countByMayorEdadLaboralAndSexoAndIdEscolar("f", otherTMId));
                    map.put(F5205_02.COLUMNS.TOTAL_MENORES.getValue(), trabajadoresRepository.countByMenorEdadLaboralAndIdEscolar(n.getId()) + trabajadoresRepository.countByMenorEdadLaboralAndIdEscolar(otherTMId));
                    map.put(F5205_02.COLUMNS.MUJERES_MENORES.getValue(), trabajadoresRepository.countByMenorEdadLaboralAndSexoAndIdEscolar("f", n.getId()) + trabajadoresRepository.countByMenorEdadLaboralAndSexoAndIdEscolar("f", otherTMId));
                    map.put(F5205_02.COLUMNS.TOTAL_OPERARIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("O", n.getId()) + trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("O", otherTMId));
                    map.put(F5205_02.COLUMNS.MUJERES_OPERARIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("O", "f", n.getId()) + trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("O", "f", otherTMId));
                    map.put(F5205_02.COLUMNS.TOTAL_SERVICIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("S", n.getId()) + trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("S", otherTMId));
                    map.put(F5205_02.COLUMNS.MUJERES_SERVICIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("S", "f", n.getId()) + trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("S", "f", otherTMId));
                    map.put(F5205_02.COLUMNS.TOTAL_TECNICOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("T", n.getId()) + trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("T", otherTMId));
                    map.put(F5205_02.COLUMNS.MUJERES_TECNICOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("T", "f", n.getId()) + trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("T", "f", otherTMId));
                    map.put(F5205_02.COLUMNS.TOTAL_ADMIN.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("A", n.getId()) + trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("A", otherTMId));
                    map.put(F5205_02.COLUMNS.MUJERES_ADMIN.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("A", "f", n.getId()) + trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("A", "f", otherTMId));
                    map.put(F5205_02.COLUMNS.TOTAL_DIREC.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("C", n.getId()) + trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("C", otherTMId));
                    map.put(F5205_02.COLUMNS.MUJERES_DIREC.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("C", "f", n.getId()) + trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("C", "f", otherTMId));

                } else {
                    continue;
                }
            } else {
                map.put(F5205_02.COLUMNS.TOTAL_TOTAL.getValue(), trabajadoresRepository.countByIdEscolarId(n.getId()));
                map.put(F5205_02.COLUMNS.MUJERES_TOTAL.getValue(), trabajadoresRepository.countBySexoAndIdEscolarId("f", n.getId()));
                map.put(F5205_02.COLUMNS.TOTAL_MAYORES.getValue(), trabajadoresRepository.countByMayorEdadLaboralAndIdEscolar(n.getId()));
                map.put(F5205_02.COLUMNS.MUJERES_MAYORES.getValue(), trabajadoresRepository.countByMayorEdadLaboralAndSexoAndIdEscolar("f", n.getId()));
                map.put(F5205_02.COLUMNS.TOTAL_MENORES.getValue(), trabajadoresRepository.countByMenorEdadLaboralAndIdEscolar(n.getId()));
                map.put(F5205_02.COLUMNS.MUJERES_MENORES.getValue(), trabajadoresRepository.countByMenorEdadLaboralAndSexoAndIdEscolar("f", n.getId()));
                map.put(F5205_02.COLUMNS.TOTAL_OPERARIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("O", n.getId()));
                map.put(F5205_02.COLUMNS.MUJERES_OPERARIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("O", "f", n.getId()));
                map.put(F5205_02.COLUMNS.TOTAL_SERVICIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("S", n.getId()));
                map.put(F5205_02.COLUMNS.MUJERES_SERVICIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("S", "f", n.getId()));
                map.put(F5205_02.COLUMNS.TOTAL_TECNICOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("T", n.getId()));
                map.put(F5205_02.COLUMNS.MUJERES_TECNICOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("T", "f", n.getId()));
                map.put(F5205_02.COLUMNS.TOTAL_ADMIN.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("A", n.getId()));
                map.put(F5205_02.COLUMNS.MUJERES_ADMIN.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("A", "f", n.getId()));
                map.put(F5205_02.COLUMNS.TOTAL_DIREC.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndIdEscolarId("C", n.getId()));
                map.put(F5205_02.COLUMNS.MUJERES_DIREC.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId("C", "f", n.getId()));
            }

            for (F5205_02.COLUMNS c : F5205_02.COLUMNS.values()) {
                if (map.get(c.getValue()) != 0) {
                    model.addData(f, c, map.get(c.getValue()));
                }
            }
        }

        //Suma control
        for (F5205_02.COLUMNS c : F5205_02.COLUMNS.values()) {
            long suma = 0;
            for (F5205_02.FILAS f : F5205_02.FILAS.values()) {
                String value = model.getValue(f, c);
                if (!value.equals("")) {
                    suma += Long.parseLong(value);
                }
            }
            if (suma != 0) {
                model.addData(F5205_02.FILAS.SUMA_CONTROL, c, suma);
            }
        }

    }

    private F5205_02.FILAS translateNivelEscolar(NivelEscolar ne) {

        switch (ne.getAbreviado()) {
            case "SUP":
                return F5205_02.FILAS.UNIVERSITARIO;
            case "T/M/SUP":
                return F5205_02.FILAS.TECNICO_MEDIO;
            case "M/SUP":
                return F5205_02.FILAS.PRE;
            case "T/M":
                return F5205_02.FILAS.TECNICO_MEDIO;
            case "MED":
                return F5205_02.FILAS.SECUNDARIA;
            case "HAB":
                if (ne.getNombre().contains("Obrero")) {
                    return F5205_02.FILAS.OBRERO;
                } else if (ne.getNombre().contains("no")) {
                    return F5205_02.FILAS.NO_PRIMARIA;
                } else {
                    return F5205_02.FILAS.PRIMARIA;
                }
        }

        return F5205_02.FILAS.OBRERO;
    }

    private int otherTMId(NivelEscolar n) {
        String tm = "T/M", tms = "T/M/SUP";

        if (n.getAbreviado().equals(tm)) {
            return neRepository.findAll().stream().filter(ne -> ne.getAbreviado().equals(tms)).findAny().get().getId();
        } else {
            return neRepository.findAll().stream().filter(ne -> ne.getAbreviado().equals(tm)).findAny().get().getId();
        }
    }
}
