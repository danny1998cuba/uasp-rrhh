/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.itextpdf.text.RomanList;
import com.uasp.hhrr.model.Escala;
import com.uasp.hhrr.repository.EscalaRepository;
import com.uasp.hhrr.utils.RomansUtils;
import java.util.Comparator;
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
public class EscalaService implements Services<Escala, Integer> {

    @Autowired
    EscalaRepository repository;

    @Override
    public Integer save(Escala object) {
        if (object.getId() != null) {
            object.setId(null);
        }
        Escala p = repository.save(object);
        return p.getId();
    }

    @Override
    public Integer update(Escala object, Integer id) {
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
    public List<Escala> findAll() {
        List<Escala> all = repository.findAll();
        all.sort(Comparator.comparing((e) -> RomansUtils.romanToInt(e.getClasificador())));
        return all;
    }

    @Override
    public Optional<Escala> findById(Integer id) {
        return repository.findById(id);
    }

}
