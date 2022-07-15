/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.controller;

import com.google.gson.Gson;
import com.uasp.hhrr.MessageResponse;
import com.uasp.hhrr.model.Trabajador;
import com.uasp.hhrr.reports.Report;
import com.uasp.hhrr.reports.TipoReporte;
import com.uasp.hhrr.reports.submodel.FilteredType;
import com.uasp.hhrr.service.ReportsService;
import com.uasp.hhrr.service.TrabajadorService;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    private ResponseEntity<?> generateReport(String fileName, Map<String, Object> params) {
        try {
            Report report = service.obtenerReporte(fileName, params);

            InputStreamResource streamResource = new InputStreamResource(report.getStream());
            MediaType mediaType;

            if (params.get("tipo").toString().equalsIgnoreCase(TipoReporte.XLS.name())) {
                mediaType = MediaType.APPLICATION_OCTET_STREAM;
            } else {
                mediaType = MediaType.APPLICATION_PDF;
            }

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename\"" + report.getFileName() + "\"");
            headers.add("Access-Control-Allow-Headers", "accept, content-type");
            headers.add("Access-Control-Allow-Methods", "POST");
            headers.add("Access-Control-Allow-Origin", "*");

            return ResponseEntity.ok().headers(headers)
                    .contentLength(report.getLength()).contentType(mediaType).body(streamResource);

        } catch (IOException | JRException | SQLException ex) {
            MessageResponse m = new MessageResponse("Error al crear el reporte: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(m));
        }
    }

    private ResponseEntity<?> generateReport(String fileName, Map<String, Object> params, JRBeanCollectionDataSource source) {
        try {

            Report report = service.obtenerReporte(fileName, params, source);

            InputStreamResource streamResource = new InputStreamResource(report.getStream());
            MediaType mediaType;

            if (params.get("tipo").toString().equalsIgnoreCase(TipoReporte.XLS.name())) {
                mediaType = MediaType.APPLICATION_OCTET_STREAM;
            } else {
                mediaType = MediaType.APPLICATION_PDF;
            }

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "inline; filename\"" + report.getFileName() + "\"");
            headers.add("Access-Control-Allow-Headers", "accept, content-type");
            headers.add("Access-Control-Allow-Methods", "POST");
            headers.add("Access-Control-Allow-Origin", "*");

            return ResponseEntity.ok().headers(headers)
                    .contentLength(report.getLength()).contentType(mediaType)
                    .allow(HttpMethod.OPTIONS).body(streamResource);

        } catch (IOException | JRException | SQLException ex) {
            MessageResponse m = new MessageResponse("Error al crear el reporte: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(m));
        }
    }
}
