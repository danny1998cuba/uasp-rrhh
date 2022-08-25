/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.controller;

import com.google.gson.Gson;
import com.uasp.hhrr.MessageResponse;
import com.uasp.hhrr.reports.Report;
import com.uasp.hhrr.reports.datasets.PlantillaAprobadaCubiertaDataset;
import com.uasp.hhrr.reports.submodel.FilteredType;
import com.uasp.hhrr.service.ReportsService;
import com.uasp.hhrr.service.TrabajadorService;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Map;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Tapanes
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/reports")
public class ReportsController {

    @Autowired
    private ReportsService service;

    @Autowired
    TrabajadorService tService;

    @Autowired
    Gson g;

    @Autowired
    PlantillaAprobadaCubiertaDataset pac;

    @PostMapping("/filtered")
    public ResponseEntity<?> trabajadorFiltered(
            @RequestBody FilteredType body,
            @RequestParam Map<String, Object> params) {
        params.put("filtrostxt", body.getFiltros());
        return generateReport("TrabajadoresFiltered", params, new JRBeanCollectionDataSource(tService.findAll(Example.of(body.getExample()))));
    }

    @PostMapping("/unidad")
    public ResponseEntity<?> trabajadorUnidad(
            @RequestParam Map<String, Object> params) {
        return generateReport("TrabajadoresUnidad", params, new JRBeanCollectionDataSource(tService.findAll()));
    }

    @GetMapping("/plantillaAC")
    public ResponseEntity<?> plantillaAprobCub(
            @RequestParam Map<String, Object> params) {
        return generateReport("plantillaAC", params, new JRBeanCollectionDataSource(pac.getDataset()));
    }

    @GetMapping("/p2")
    public ResponseEntity<?> P2(
            @RequestParam Map<String, Object> params) {
        if (params.get("unidadId") != null) {
            int unidadId = Integer.parseInt(params.get("unidadId").toString());
            params.replace("unidadId", unidadId);
            return generateReport("P2", params);
        } else {
            MessageResponse m = new MessageResponse("Falta el id de la unidad");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(g.toJson(m));
        }
    }

    private ResponseEntity<?> generateReport(String fileName, Map<String, Object> params) {
        try {
            Report report = service.obtenerReporte(fileName, params);

            byte[] array = new byte[report.getStream().available()];
            report.getStream().read(array);

            String encoded = Base64.getEncoder().encodeToString(array);

            MessageResponse m = new MessageResponse(encoded);
            return ResponseEntity.ok().body(m);

        } catch (IOException | JRException | SQLException ex) {
            MessageResponse m = new MessageResponse("Error al crear el reporte: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(m));
        }
    }

    private ResponseEntity<?> generateReport(String fileName, Map<String, Object> params, JRBeanCollectionDataSource source) {
        try {

            Report report = service.obtenerReporte(fileName, params, source);

            byte[] array = new byte[report.getStream().available()];
            report.getStream().read(array);

            String encoded = Base64.getEncoder().encodeToString(array);

            MessageResponse m = new MessageResponse(encoded);
            return ResponseEntity.ok().body(m);
        } catch (IOException | JRException | SQLException ex) {
            MessageResponse m = new MessageResponse("Error al crear el reporte: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(m));
        }
    }
}
