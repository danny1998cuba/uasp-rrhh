/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.models;

import com.uasp.hhrr.model.Ausencias;
import com.uasp.hhrr.model.Levantamiento;
import com.uasp.hhrr.repository.AusenciasRepository;
import com.uasp.hhrr.repository.DepartamentoCargoRepostory;
import com.uasp.hhrr.repository.LevantamientoRepository;
import com.uasp.hhrr.repository.TrabajadorRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author Tapanes
 */
@Component
public class F5202_07FillHelper {

    @Autowired
    TrabajadorRepository trabajadoresRepository;

    @Autowired
    DepartamentoCargoRepostory dcRepository;

    @Autowired
    AusenciasRepository ausenciasRepository;

    @Autowired
    LevantamientoRepository levantamientoRepository;

    public void fillModel(F5202_07 model) {

        //Fila 100
        //Plan
        long plantillaAprobada = dcRepository.countPlazas();
        model.addData(F5202_07.FILAS.PROM_TRAB, F5202_07.COLUMNS.PLAN_ANUAL, plantillaAprobada);
        model.addData(F5202_07.FILAS.PROM_TRAB, F5202_07.COLUMNS.PLAN_ACUMULADO, plantillaAprobada);
        //Mes
        HashMap<String, Number> map = procesarPromedioTrabs(false);
        for (F5202_07.COLUMNS c : F5202_07.COLUMNS.values()) {
            if (map.get(c.getValue()) != null && map.get(c.getValue()).doubleValue() != 0d) {
                model.addData(F5202_07.FILAS.PROM_TRAB, c, map.get(c.getValue()).doubleValue());
            }
        }
        //Mujeres
        map = procesarPromedioTrabs(true);
        for (F5202_07.COLUMNS c : F5202_07.COLUMNS.values()) {
            if (map.get(c.getValue()) != null && map.get(c.getValue()).doubleValue() != 0d) {
                model.addData(F5202_07.FILAS.PROM_MUJERES, c, map.get(c.getValue()).doubleValue());
            }
        }

        //Fila 200 Num trabajadores
        model.addData(F5202_07.FILAS.NUM_TRAB, F5202_07.COLUMNS.REAL_MES, trabajadoresRepository.count());

        //Fila 300 Num mujeres
        model.addData(F5202_07.FILAS.NUM_MUJERES, F5202_07.COLUMNS.REAL_MES, trabajadoresRepository.countBySexo("f"));

        //Fila 500 Tiempo
        map = procesarTiempo();
        for (F5202_07.COLUMNS c : F5202_07.COLUMNS.values()) {
            if (map.get(c.getValue()) != null && map.get(c.getValue()).doubleValue() != 0d) {
                model.addData(F5202_07.FILAS.TIEMPO_TRABAJADO, c, map.get(c.getValue()).doubleValue());
            }
        }
    }

    private HashMap<String, Number> procesarPromedioTrabs(boolean isMujer) {
        HashMap<String, Number> map = new HashMap<>();

        long realDisponble = isMujer ? trabajadoresRepository.countBySexoAndMision("f", false) : trabajadoresRepository.countByMision(false);

        double acumulado = 0d;
        for (int i = Calendar.getInstance().get(Calendar.MONTH) + 1; i >= 1; i--) {
            int totalNoFis = 0;
            for (Levantamiento lev : levantamientoRepository.findByMes(Calendar.getInstance().get(Calendar.YEAR), i)) {
                totalNoFis += isMujer ? lev.getTotalMujeresNoFisico() : lev.getNoFisicos();
            }
            double realMes = realDisponble - totalNoFis;

            if (i == Calendar.getInstance().get(Calendar.MONTH) + 1) {
                map.put(F5202_07.COLUMNS.REAL_MES.getValue(), realMes);
            }

            acumulado += realMes;
        }

        double realAcumulado = acumulado / (Calendar.getInstance().get(Calendar.MONTH) + 1);
        BigDecimal bd = new BigDecimal(realAcumulado);
        bd = bd.setScale(2, RoundingMode.HALF_UP);

        map.put(F5202_07.COLUMNS.REAL_ACUMULADO.getValue(), bd.doubleValue());

        return map;
    }

    private HashMap<String, Number> procesarTiempo() {
        HashMap<String, Number> map = new HashMap<>();

        long plantillaCubierta = trabajadoresRepository.count();

        double acumulado = 0d;
        for (int i = Calendar.getInstance().get(Calendar.MONTH) + 1; i >= 1; i--) {
            int totalAus = 0;
            for (Ausencias aus : ausenciasRepository.findByMes(Calendar.getInstance().get(Calendar.YEAR), i)) {
                totalAus += aus.getTotal();
            }
            double realMes = ((plantillaCubierta * 24) - totalAus) * 7.94;

            if (i == Calendar.getInstance().get(Calendar.MONTH) + 1) {
                map.put(F5202_07.COLUMNS.REAL_MES.getValue(), realMes);
            }

            acumulado += realMes;
        }
        map.put(F5202_07.COLUMNS.REAL_ACUMULADO.getValue(), acumulado);

        return map;
    }

}
