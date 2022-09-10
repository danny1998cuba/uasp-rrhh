/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.model.Ausencias;
import com.uasp.hhrr.repository.AusenciasRepository;
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
public class AusenciasService implements Services<Ausencias, Integer> {

    @Autowired
    AusenciasRepository repository;

    @Override
    public Integer save(Ausencias object) {
        if (object.getId() != null) {
            object.setId(null);
        }
        Ausencias p = repository.save(object);
        return p.getId();
    }

    @Override
    public Integer update(Ausencias object, Integer id) {
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
    public List<Ausencias> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Ausencias> findById(Integer id) {
        return repository.findById(id);
    }

    public List<Ausencias> getByMonth(Date fecha) {
        Calendar c = Calendar.getInstance();
        c.setTime(fecha);
        return repository.findByMes(c.get(Calendar.YEAR), c.get(Calendar.MONTH) + 1);
    }

    public void actualizarDb(Date fecha, List<Ausencias> data) {
        List<Ausencias> enDb = getByMonth(fecha);
        
        enDb.forEach(aus -> {
            if (!data.contains(aus)) {
                deleteById(aus.getId());
            }
        });

        data.forEach(aus -> {
            if (enDb.contains(aus)) {
                update(aus, enDb.get(enDb.indexOf(aus)).getId());
            } else {
                save(aus);
            }
        });
    }

}
