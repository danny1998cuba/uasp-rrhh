/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.model.Departamento;
import com.uasp.hhrr.repository.DepartamentoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class DepartamentoService implements Services<Departamento, Integer> {

    @Autowired
    DepartamentoRepository repository;

    @Override
    public Integer save(Departamento object) {
        if (object.getId() != null) {
            object.setId(null);
        }
        Departamento p = repository.save(object);
        return p.getId();
    }

    @Override
    public Integer update(Departamento object, Integer id) {
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
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<Departamento> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Departamento> findById(Integer id) {
        return repository.findById(id);
    }

    public List<Departamento> findByIdUnidad(int idUnidad) {
        return repository.findByIdUnidad(idUnidad);
    }

    public Optional<Departamento> findByIdUnidadAndNombre(int idUnidad, String nombre) {
        return Optional.ofNullable(repository.findByIdUnidadAndNombre(idUnidad, nombre));
    }

}
