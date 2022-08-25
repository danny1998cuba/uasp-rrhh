/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.endpoint;

import com.google.gson.Gson;
import com.uasp.hhrr.sigelite.xml.XMLGenerator;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/5205")
    public ResponseEntity<?> trabajadorUnidad(
            @RequestParam Map<String, Object> params) {
        params.put("observ", "dasdas");
        return ResponseEntity.ok(XMLGenerator.getInstance().toXml(service.generate_5205(params).getModelo()));
    }
}
