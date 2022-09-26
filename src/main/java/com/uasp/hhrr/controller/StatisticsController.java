/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.controller;

import com.uasp.hhrr.exceptions.InvalidControlSumException;
import com.uasp.hhrr.model.Unidad;
import com.uasp.hhrr.reports.datasources.TrabajadorSalarioDataSource;
import com.uasp.hhrr.reports.submodel.TrabajadorSalario;
import com.uasp.hhrr.service.NocturnidadService;
import com.uasp.hhrr.service.ReportsService;
import com.uasp.hhrr.service.UnidadService;
import com.uasp.hhrr.sigelite.models.F5202_07;
import com.uasp.hhrr.sigelite.models.F5202_07FillHelper;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Tapanes
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/stats")
public class StatisticsController {

    @Autowired
    F5202_07FillHelper helper;

    @Autowired
    UnidadService unidadService;

    @Autowired
    ReportsService reportsService;

    @Autowired
    NocturnidadService nocturnidadService;

    @GetMapping("promedio")
    public ResponseEntity<?> promTrabs() {
        List<PromResult> result = new ArrayList<>();

        for (int i = 1; i <= Calendar.getInstance().get(Calendar.MONTH) + 1; i++) {
            HashMap<String, Number> promTotal = helper.procesarPromedioTrabs(false, i);
            HashMap<String, Number> promMuj = helper.procesarPromedioTrabs(true, i);

            result.add(new PromResult(i,
                    Math.round(promTotal.get(F5202_07.COLUMNS.REAL_MES.getValue()).doubleValue()),
                    Math.round(promTotal.get(F5202_07.COLUMNS.REAL_ACUMULADO.getValue()).doubleValue()),
                    Math.round(promMuj.get(F5202_07.COLUMNS.REAL_MES.getValue()).doubleValue()),
                    Math.round(promMuj.get(F5202_07.COLUMNS.REAL_ACUMULADO.getValue()).doubleValue())));
        }

        return ResponseEntity.ok(result);
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    private class PromResult {

        private int mes;
        private long promTotalAct;
        private long promTotalAcum;
        private long promMujeresAct;
        private long promMujeresAcum;
    }

    @GetMapping("tiempo")
    public ResponseEntity<?> tiempo() {
        List<TiempoResult> result = new ArrayList<>();

        for (int i = 1; i <= Calendar.getInstance().get(Calendar.MONTH) + 1; i++) {
            HashMap<String, Number> tiempoTotal = helper.procesarTiempo(i);

            result.add(new TiempoResult(i,
                    Math.round(tiempoTotal.get(F5202_07.COLUMNS.REAL_MES.getValue()).doubleValue()),
                    Math.round(tiempoTotal.get(F5202_07.COLUMNS.REAL_ACUMULADO.getValue()).doubleValue())));
        }

        return ResponseEntity.ok(result);
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    private class TiempoResult {

        private int mes;
        private long tiempoAct;
        private long tiempoAcum;
    }

    @GetMapping("salario")
    public ResponseEntity<?> salario() throws InvalidControlSumException {
        List<SalarioResult> result = new ArrayList<>();

        unidadService.findAll().forEach((u) -> {
            Date actual = Calendar.getInstance().getTime();
            TrabajadorSalarioDataSource ds = reportsService.databaseDS(nocturnidadService.getByMonth(actual), u);

            double totalUnidad = 0d;

            for (TrabajadorSalario ts : ds.getList()) {
                double adic = ts.getTrabajador() != null
                        ? ((ts.getNocturnidad() != null ? ts.getNocturnidad() : 0)
                        + (ts.getCla() != null ? ts.getCla() : 0)
                        + (ts.getMaestriaDoctorado() != null ? ts.getMaestriaDoctorado() : 0)
                        + (ts.getDocencia() != null ? ts.getDocencia() : 0))
                        : 0;

                totalUnidad += ts.getTrabajador() != null ? (ts.getCargo().getIdEscala().getSalario() + adic) : 0;
            }

            result.add(new SalarioResult(u, totalUnidad));
        });

        return ResponseEntity.ok(result);
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    private class SalarioResult {

        private Unidad unidad;
        private double salario;
    }
}
