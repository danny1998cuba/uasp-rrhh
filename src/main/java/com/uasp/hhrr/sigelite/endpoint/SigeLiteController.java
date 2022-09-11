/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.endpoint;

import com.google.gson.Gson;
import com.uasp.hhrr.MessageResponse;
import com.uasp.hhrr.reports.Report;
import com.uasp.hhrr.sigelite.xml.XMLGenerator;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Map;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Tapanes
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/sigelite")
public class SigeLiteController {

    @Autowired
    SigeLiteService service;

    @Autowired
    Gson g;

    @GetMapping("/5202")
    public ResponseEntity<?> F5202(
            @RequestParam Map<String, Object> params) {
        return generateEncryptedFile(XMLGenerator.getInstance().toXml(service.generate_5202(params).getModelo()));
    }

    @GetMapping("/5205")
    public ResponseEntity<?> F5205(
            @RequestParam Map<String, Object> params) {
        return generateEncryptedFile(XMLGenerator.getInstance().toXml(service.generate_5205(params).getModelo()));
    }

    private ResponseEntity<?> generateEncryptedFile(String xml) {

        if (xml != null | !xml.equals("")) {
            String encoded = Base64.getEncoder().encodeToString(xml.getBytes());
            MessageResponse m = new MessageResponse(encoded);
            return ResponseEntity.ok().body(m);
        } else {
            MessageResponse m = new MessageResponse("No se obtuvo correctamente el archivo");
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(m);
        }
    }
}
