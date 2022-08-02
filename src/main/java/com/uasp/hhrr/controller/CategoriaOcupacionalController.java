/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.uasp.hhrr.controller;

import com.google.gson.Gson;
import com.uasp.hhrr.MessageResponse;
import com.uasp.hhrr.model.CategoriaOcupacional;
import com.uasp.hhrr.service.CategoriaOcupacionalService;
import java.util.Map;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Tapanes
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/catOcup")
public class CategoriaOcupacionalController {

    @Autowired
    CategoriaOcupacionalService service;

    @Autowired
    Gson g;

    @GetMapping("")
    public ResponseEntity<?> list(
            @RequestParam Map<String, Object> params) {

        if (params.get("parent") != null) {
            if (Boolean.parseBoolean(params.get("parent").toString())) {
                return ResponseEntity.ok(service.findChildCats());
            } else {
                return ResponseEntity.ok(service.findRootCats());
            }
        } else {
            return ResponseEntity.ok(service.findAll());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable int id) {
        return ResponseEntity.of(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable int id, @RequestBody CategoriaOcupacional input) {
        try {

            if (input.getParent() != null && !service.findById(input.getParent().getId()).get().getAbreviado().equals(input.getAbreviado())) {
                MessageResponse m = new MessageResponse("La abreviatura de una categoría hija debe coincidir con la de su padre");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(g.toJson(m));
            }

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
                MessageResponse m = new MessageResponse("Ya existe una categoría con este nombre");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(g.toJson(m));
            } else {
                MessageResponse m = new MessageResponse(ex.getMessage());
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
            }
        } catch (Exception e) {
            MessageResponse m = new MessageResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
        }
    }

    @PostMapping("")
    public ResponseEntity<?> post(@RequestBody CategoriaOcupacional input) {
        try {
            if (input.getParent() != null && !service.findById(input.getParent().getId()).get().getAbreviado().equals(input.getAbreviado())) {
                MessageResponse m = new MessageResponse("La abreviatura de una categoría hija debe coincidir con la de su padre");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(g.toJson(m));
            }

            int idRes = service.save(input);
            MessageResponse m = new MessageResponse("Elemento creado con id " + idRes);
            return ResponseEntity.status(HttpStatus.CREATED).body(g.toJson(m));
        } catch (DataIntegrityViolationException ex) {
            if (ex.getCause().getCause().getMessage().contains("Duplicate entry")) {
                MessageResponse m = new MessageResponse("Ya existe una categoría con este nombre");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(g.toJson(m));
            } else {
                MessageResponse m = new MessageResponse(ex.getMessage());
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
            }
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
        } catch (DataIntegrityViolationException ex) {
            MessageResponse m = new MessageResponse("Existen entidades vinculadas a esta categoría. Elimínelas o modifíquelas antes.");
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
        } catch (Exception e) {
            MessageResponse m = new MessageResponse(e.toString());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
        }
    }

}
