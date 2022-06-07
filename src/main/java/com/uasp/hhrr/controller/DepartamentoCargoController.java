/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.uasp.hhrr.controller;

import com.google.gson.Gson;
import com.uasp.hhrr.MessageResponse;
import com.uasp.hhrr.model.DepartamentoCargo;
import com.uasp.hhrr.model.DepartamentoCargoPK;
import com.uasp.hhrr.service.DepartamentoCargoService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/departamento_cargo")
public class DepartamentoCargoController {

    @Autowired
    DepartamentoCargoService service;

    @Autowired
    Gson g;

    @GetMapping("")
    public ResponseEntity<?> list() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{idDep}/{idCargo}")
    public ResponseEntity<?> get(@PathVariable int idDep, @PathVariable int idCargo) {
        return ResponseEntity.of(service.findById(new DepartamentoCargoPK(idDep, idCargo)));
    }

    @PutMapping("/{idDep}/{idCargo}")
    public ResponseEntity<?> put(@PathVariable int idDep, @PathVariable int idCargo, @RequestBody DepartamentoCargo input) {
        try {
            DepartamentoCargoPK idRes = service.update(input, new DepartamentoCargoPK(idDep, idCargo));

            if (idRes != null) {
                MessageResponse m = new MessageResponse("Elemento con id " + idRes.getDepartamentoid() + "/" + idRes.getCargoid() + " modificado correctamente");
                return ResponseEntity.ok(g.toJson(m));
            } else {
                MessageResponse m = new MessageResponse("No se encuentra el elemento con idDep " + idDep + " y idCargo " + idCargo);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(m));
            }

        } catch (Exception e) {
            MessageResponse m = new MessageResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
        }
    }

    @PostMapping("")
    public ResponseEntity<?> post(@RequestBody DepartamentoCargo input) {
        try {
            input.setDepartamentoCargoPK(new DepartamentoCargoPK(input.getDepartamento().getId(), input.getCargo().getId()));
            if (!service.findById(input.getDepartamentoCargoPK()).isPresent()) {
                DepartamentoCargoPK idRes = service.save(input);
                MessageResponse m = new MessageResponse("Elemento creado con id " + idRes.getDepartamentoid() + "/" + idRes.getCargoid());
                return ResponseEntity.status(HttpStatus.CREATED).body(g.toJson(m));
            } else {
                MessageResponse m = new MessageResponse("Ya existía esta relación");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(g.toJson(m));
            }
        } catch (Exception e) {
            e.printStackTrace();
            MessageResponse m = new MessageResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
        }
    }

    @DeleteMapping("/{idDep}/{idCargo}")
    public ResponseEntity<?> delete(@PathVariable int idDep, @PathVariable int idCargo) {
        try {
            boolean deleted = service.deleteById(new DepartamentoCargoPK(idDep, idCargo));

            if (deleted) {
                MessageResponse m = new MessageResponse("Elemento con idDep " + idDep + " y idCargo " + idCargo + " eliminado correctamente");
                return ResponseEntity.ok(g.toJson(m));
            } else {
                MessageResponse m = new MessageResponse("No se encuentra el elemento con idDep " + idDep + " y idCargo " + idCargo);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(m));
            }
        } catch (Exception e) {
            MessageResponse m = new MessageResponse(e.toString());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(g.toJson(m));
        }
    }
}
