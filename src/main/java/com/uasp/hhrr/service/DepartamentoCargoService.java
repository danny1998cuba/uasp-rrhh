/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.model.DepartamentoCargo;
import com.uasp.hhrr.model.DepartamentoCargoPK;
import com.uasp.hhrr.repository.DepartamentoCargoRepostory;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class DepartamentoCargoService implements Services<DepartamentoCargo, DepartamentoCargoPK> {

    @Autowired
    DepartamentoCargoRepostory repository;

    @Override
    public DepartamentoCargoPK save(DepartamentoCargo object) {
//        if(object.getDepartamentoCargoPK() != null) {
//            object.set(null);
//        }
        DepartamentoCargo p = repository.save(object);
        return p.getDepartamentoCargoPK();
    }

    @Override
    public DepartamentoCargoPK update(DepartamentoCargo object, DepartamentoCargoPK id) {
        if (repository.findById(id).isPresent()) {
            object.setDepartamentoCargoPK(id);
            repository.save(object);
            return id;
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteById(DepartamentoCargoPK id) {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<DepartamentoCargo> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<DepartamentoCargo> findById(DepartamentoCargoPK id) {
        return repository.findById(id);
    }

}
