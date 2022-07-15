/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.exceptions.NivelEscolarMinReqExcception;
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

    public Integer save(Trabajador object) throws NivelEscolarMinReqExcception {
        if (object.getId() != null) {
            object.setId(null);
        }

        if (object.getIdCargo().getIdEscolarMin().getRelevancia() > object.getIdEscolar().getRelevancia()) {
            throw new NivelEscolarMinReqExcception();
        }

        Trabajador p = repository.save(object);
        return p.getId();
    }

    public Integer update(Trabajador object, Integer id) throws NivelEscolarMinReqExcception {
        if (repository.findById(id).isPresent()) {
            object.setId(id);

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
