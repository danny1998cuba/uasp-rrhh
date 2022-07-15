/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.model.NivelEscolar;
import com.uasp.hhrr.repository.NivelEscolarRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class NivelEscolarService implements Services<NivelEscolar, Integer> {

    @Autowired
    NivelEscolarRepository repository;

    @Override
    public Integer save(NivelEscolar object) {
        if(object.getId() != null) {
            object.setId(null);
        }
        NivelEscolar p = repository.save(object);
        return p.getId();
    }

    @Override
    public Integer update(NivelEscolar object, Integer id) {
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
    public List<NivelEscolar> findAll() {
        return repository.findAll(Sort.by(Sort.Order.desc("relevancia")));
    }

    @Override
    public Optional<NivelEscolar> findById(Integer id) {
        return repository.findById(id);
    }

}
