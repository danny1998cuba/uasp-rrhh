/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.uasp.hhrr.controller;

import com.google.gson.Gson;
import com.uasp.hhrr.MessageResponse;
import com.uasp.hhrr.exceptions.NivelEscolarMinReqExcception;
import com.uasp.hhrr.model.Trabajador;
import com.uasp.hhrr.service.TrabajadorService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

/**
 *
 * @author Tapanes
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/trabajador")
public class TrabajadorController {

    @Autowired
    TrabajadorService service;

    @Autowired
    Gson g;

    @GetMapping("")
    public ResponseEntity<?> list() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping("/filter")
    public ResponseEntity<?> findAllByExample(@RequestBody Trabajador example) {
        return ResponseEntity.ok(service.findAll(Example.of(example)));
    }

    @PostMapping("/count")
    public ResponseEntity<?> countByExample(@RequestBody Trabajador example) {
        return ResponseEntity.ok(service.countByExample(Example.of(example)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable int id) {
        return ResponseEntity.of(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable int id, @RequestBody Trabajador input) {
        try {
            int idRes = service.update(input, id);

            if (idRes != -1) {
                MessageResponse m = new MessageResponse("Elemento con id " + idRes + " modificado correctamente");
                return ResponseEntity.ok(g.toJson(m));
            } else {
                MessageResponse m = new MessageResponse("No se encuentra el elemento con id " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(m));
            }

        } catch (DataIntegrityViolationException ex) {
            if (ex.getCause().getCause().getMessage().contains("Duplicate entry")) {
                MessageResponse m = new MessageResponse("Ya existe untrabajador con este carné de identidad");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(g.toJson(m));
            } else {
                MessageResponse m = new MessageResponse(ex.getMessage());
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
            }
        } catch (NivelEscolarMinReqExcception ex) {
            MessageResponse m = new MessageResponse(ex.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
        } catch (Exception e) {
            MessageResponse m = new MessageResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
        }
    }

    @PostMapping("")
    public ResponseEntity<?> post(@RequestBody Trabajador input) {
        try {
            int idRes = service.save(input);
            MessageResponse m = new MessageResponse("Elemento creado con id " + idRes);
            return ResponseEntity.status(HttpStatus.CREATED).body(g.toJson(m));
        } catch (DataIntegrityViolationException ex) {
            if (ex.getCause().getCause().getMessage().contains("Duplicate entry")) {
                MessageResponse m = new MessageResponse("Ya existe untrabajador con este carné de identidad");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(g.toJson(m));
            } else {
                MessageResponse m = new MessageResponse(ex.getMessage());
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
            }
        } catch (NivelEscolarMinReqExcception ex) {
            MessageResponse m = new MessageResponse(ex.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
        } catch (Exception e) {
            MessageResponse m = new MessageResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            boolean deleted = service.deleteById(id);

            if (deleted) {
                MessageResponse m = new MessageResponse("Elemento con id " + id + " eliminado correctamente");
                return ResponseEntity.ok(g.toJson(m));
            } else {
                MessageResponse m = new MessageResponse("No se encuentra el elemento con id " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(m));
            }

        } catch (Exception e) {
            MessageResponse m = new MessageResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
        }
    }

}
