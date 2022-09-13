/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.model.Ausencias;
import com.uasp.hhrr.model.Nocturnidades;
import com.uasp.hhrr.repository.NocturnidadRepository;
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
public class NocturnidadService implements Services<Nocturnidades, Integer> {

    @Autowired
    NocturnidadRepository repository;

    @Override
    public Integer save(Nocturnidades object) {
        if (object.getId() != null) {
            object.setId(null);
        }
        Nocturnidades p = repository.save(object);
        return p.getId();
    }

    @Override
    public Integer update(Nocturnidades object, Integer id) {
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
    public List<Nocturnidades> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Nocturnidades> findById(Integer id) {
        return repository.findById(id);
    }

    public List<Nocturnidades> getByMonth(Date fecha) {
        Calendar c = Calendar.getInstance();
        c.setTime(fecha);
        return repository.findByMes(c.get(Calendar.YEAR), c.get(Calendar.MONTH) + 1);
    }

    public void actualizarDb(Date fecha, List<Nocturnidades> data) {
        List<Nocturnidades> enDb = getByMonth(fecha);

        enDb.forEach(noct -> {
            if (!data.contains(noct)) {
                deleteById(noct.getId());
            }
        });

        data.forEach(noct -> {
            if (enDb.contains(noct)) {
                update(noct, enDb.get(enDb.indexOf(noct)).getId());
            } else {
                save(noct);
            }
        });
    }

}
