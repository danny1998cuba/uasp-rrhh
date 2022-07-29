/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.google.gson.Gson;
import com.uasp.hhrr.exceptions.NivelEscolarMinReqExcception;
import com.uasp.hhrr.exceptions.PlazasDisponiblesException;
import com.uasp.hhrr.model.Trabajador;
import com.uasp.hhrr.repository.TrabajadorRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class TrabajadorService {

    @Autowired
    TrabajadorRepository repository;

    @Autowired
    DepartamentoCargoService dcService;

    public Integer save(Trabajador object) throws NivelEscolarMinReqExcception, PlazasDisponiblesException {
        if (object.getId() != null) {
            object.setId(null);
        }

        if (!dcService.disponibilidad(object.getIdDepartamento(), object.getIdCargo())) {
            throw new PlazasDisponiblesException();
        }

        if (object.getIdCargo().getIdEscolarMin().getRelevancia() > object.getIdEscolar().getRelevancia()) {
            throw new NivelEscolarMinReqExcception();
        }

        Trabajador p = repository.save(object);
        return p.getId();
    }

    public Integer update(Trabajador object, Integer id) throws NivelEscolarMinReqExcception, PlazasDisponiblesException {
        if (repository.findById(id).isPresent()) {
            Trabajador oldData = repository.findById(id).get();
            object.setId(id);

            if ((oldData.getIdCargo().getId() != object.getIdCargo().getId()
                    || oldData.getIdDepartamento().getId() != object.getIdDepartamento().getId())
                    && !dcService.disponibilidad(object.getIdDepartamento(), object.getIdCargo())) {

                throw new PlazasDisponiblesException();
            }

            if (object.getIdCargo().getIdEscolarMin().getRelevancia() > object.getIdEscolar().getRelevancia()) {
                throw new NivelEscolarMinReqExcception();
            }

            repository.save(object);
            return id;
        } else {
            return -1;
        }
    }

    public boolean deleteById(Integer id) {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public List<Trabajador> findAll() {
        return repository.findAll();
    }

    public Optional<Trabajador> findById(Integer id) {
        return repository.findById(id);
    }

    public List<Trabajador> findAll(Specification<Trabajador> spec) {
        return repository.findAll(spec);
    }

    public List<Trabajador> findAll(Example<Trabajador> example) {
        return repository.findAll(example);
    }

    public long countByExample(Example<Trabajador> example) {
        return repository.count(example);
    }

}
