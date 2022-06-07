/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.model.Cargo;
import com.uasp.hhrr.repository.CargoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class CargoService implements Services<Cargo, Integer> {

    @Autowired
    CargoRepository repository;

    @Override
    public Integer save(Cargo object) {
        if(object.getId() != null) {
            object.setId(null);
        }
        Cargo p = repository.save(object);
        return p.getId();
    }

    @Override
    public Integer update(Cargo object, Integer id) {
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
    public List<Cargo> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Cargo> findById(Integer id) {
        return repository.findById(id);
    }

}
