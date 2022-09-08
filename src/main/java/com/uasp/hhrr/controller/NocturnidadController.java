/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.uasp.hhrr.controller;

import com.google.gson.Gson;
import com.uasp.hhrr.MessageResponse;
import com.uasp.hhrr.service.NocturnidadService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Tapanes
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/noct")
public class NocturnidadController {

    @Autowired
    NocturnidadService service;

    @Autowired
    Gson g;

    @GetMapping("")
    public ResponseEntity<?> list() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable int id) {
        return ResponseEntity.of(service.findById(id));
    }

    @GetMapping("/mes")
    public ResponseEntity<?> getByMonth(@RequestParam Map<String, Object> params) {
        if (params.get("fecha") != null) {
            try {
                Date fecha = new SimpleDateFormat("yyyy-MM-dd").parse(params.get("fecha").toString());
                return ResponseEntity.ok(service.getByMonth(fecha));    
            } catch (ParseException ex) {
                MessageResponse m = new MessageResponse("El formato de la fecha ingresada no es correcto");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(g.toJson(m));
            }
        } else {
            MessageResponse m = new MessageResponse("Falta la fecha");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(g.toJson(m));
        }
    }

}
