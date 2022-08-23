/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.endpoint;

import com.uasp.hhrr.repository.DepartamentoCargoRepostory;
import com.uasp.hhrr.repository.TrabajadorRepository;
import com.uasp.hhrr.sigelite.models.F5205_03;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class SigeLiteService {

    @Autowired
    TrabajadorRepository trabajadoresRepository;

    @Autowired
    DepartamentoCargoRepostory dcRepository;

    public F5205_03 generate_5205(Map<String, Object> params) {
        F5205_03.F5205_03Builder builder = new F5205_03.F5205_03Builder(Calendar.getInstance().get(Calendar.MONTH) - 1, "28");

        if (params.containsKey("observ")) {
            builder.setObservaciones(params.get("observ").toString());
        }

        F5205_03 model = builder.build();
        fillModel(model);

        return model;
    }

    private void fillModel(F5205_03 model) {
        HashMap<String, Long> map = new HashMap<>();

        map.put(F5205_03.COLUMNS.TOTAL_TOTAL.getValue(), trabajadoresRepository.count());
        map.put(F5205_03.COLUMNS.MUJERES_TOTAL.getValue(), trabajadoresRepository.countBySexo("f"));
        map.put(F5205_03.COLUMNS.TOTAL_MAYORES.getValue(), 0l);
        map.put(F5205_03.COLUMNS.MUJERES_MAYORES.getValue(), 0l);
        map.put(F5205_03.COLUMNS.TOTAL_MENORES.getValue(), 0l);
        map.put(F5205_03.COLUMNS.MUJERES_MENORES.getValue(), 0l);
        map.put(F5205_03.COLUMNS.TOTAL_OPERARIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviado("O"));
        map.put(F5205_03.COLUMNS.MUJERES_OPERARIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexo("O", "f"));
        map.put(F5205_03.COLUMNS.TOTAL_SERVICIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviado("S"));
        map.put(F5205_03.COLUMNS.MUJERES_SERVICIOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexo("S", "f"));
        map.put(F5205_03.COLUMNS.TOTAL_TECNICOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviado("T"));
        map.put(F5205_03.COLUMNS.MUJERES_TECNICOS.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexo("T", "f"));
        map.put(F5205_03.COLUMNS.TOTAL_ADMIN.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviado("A"));
        map.put(F5205_03.COLUMNS.MUJERES_ADMIN.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexo("A", "f"));
        map.put(F5205_03.COLUMNS.TOTAL_DIREC.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviado("C"));
        map.put(F5205_03.COLUMNS.MUJERES_DIREC.getValue(), trabajadoresRepository.countByIdCargoIdCatOcupAbreviadoAndSexo("C", "f"));

        //Total ocupados y Jaruco
        for (F5205_03.COLUMNS c : F5205_03.COLUMNS.values()) {
            if (map.get(c.getValue()) != 0) {
                model.addData(F5205_03.FILAS.TOTAL_OCUPADOS, c, map.get(c.getValue()));
                model.addData(F5205_03.FILAS.JARUCO, c, map.get(c.getValue()));
            }
        }
        
        //Vacantes 
        model.addData(F5205_03.FILAS.TOTAL_VACANTES, F5205_03.COLUMNS.TOTAL_TOTAL, dcRepository.countPlazas() - map.get(F5205_03.COLUMNS.TOTAL_TOTAL.getValue()));
        model.addData(F5205_03.FILAS.TOTAL_VACANTES, F5205_03.COLUMNS.TOTAL_OPERARIOS, dcRepository.plazasByCatOcup("O") - map.get(F5205_03.COLUMNS.TOTAL_OPERARIOS.getValue()));
        model.addData(F5205_03.FILAS.TOTAL_VACANTES, F5205_03.COLUMNS.TOTAL_SERVICIOS, dcRepository.plazasByCatOcup("S") - map.get(F5205_03.COLUMNS.TOTAL_SERVICIOS.getValue()));
        model.addData(F5205_03.FILAS.TOTAL_VACANTES, F5205_03.COLUMNS.TOTAL_TECNICOS, dcRepository.plazasByCatOcup("T") - map.get(F5205_03.COLUMNS.TOTAL_TECNICOS.getValue()));
        model.addData(F5205_03.FILAS.TOTAL_VACANTES, F5205_03.COLUMNS.TOTAL_ADMIN, dcRepository.plazasByCatOcup("A") - map.get(F5205_03.COLUMNS.TOTAL_ADMIN.getValue()));
        model.addData(F5205_03.FILAS.TOTAL_VACANTES, F5205_03.COLUMNS.TOTAL_DIREC, dcRepository.plazasByCatOcup("C") - map.get(F5205_03.COLUMNS.TOTAL_DIREC.getValue()));
    }

}
