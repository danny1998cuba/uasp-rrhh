/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.model.Levantamiento;
import com.uasp.hhrr.repository.LevantamientoRepository;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class LevantamientoService implements Services<Levantamiento, Integer> {

    @Autowired
    LevantamientoRepository repository;

    @Override
    public Integer save(Levantamiento object) {
        if(object.getId() != null) {
            object.setId(null);
        }
        Levantamiento p = repository.save(object);
        return p.getId();
    }

    @Override
    public Integer update(Levantamiento object, Integer id) {
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
    public List<Levantamiento> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Levantamiento> findById(Integer id) {
        return repository.findById(id);
    }
    
    public List<Levantamiento> getByMonth(Date fecha) {
        Calendar c = Calendar.getInstance();
        c.setTime(fecha);
        return repository.findByMes(c.get(Calendar.YEAR), c.get(Calendar.MONTH) + 1);
    }

}
