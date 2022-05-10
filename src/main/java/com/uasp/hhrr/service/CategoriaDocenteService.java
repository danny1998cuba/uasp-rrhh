/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.model.CategoriaDocente;
import com.uasp.hhrr.repository.CategoriaDocenteRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class CategoriaDocenteService implements Services<CategoriaDocente, Integer> {

    @Autowired
    CategoriaDocenteRepository repository;

    @Override
    public Integer save(CategoriaDocente object) {
        if(object.getId() != null) {
            object.setId(null);
        }
        CategoriaDocente p = repository.save(object);
        return p.getId();
    }

    @Override
    public Integer update(CategoriaDocente object, Integer id) {
        if (repository.findById(id).isPresent()) {
            object.setId(id);
            repository.save(object);
            return id;
        } else {
            return -1;
        }
    }

    @Override
    public boolean deleteById(Integer id) {
        return true;
    }

    @Override
    public List<CategoriaDocente> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<CategoriaDocente> findById(Integer id) {
        return repository.findById(id);
    }
}
