/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.model.CategoriaOcupacional;
import com.uasp.hhrr.repository.CategoriaOcupacionalRepository;
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
public class CategoriaOcupacionalService implements Services<CategoriaOcupacional, Integer> {
    
    @Autowired
    CategoriaOcupacionalRepository repository;
    
    @Override
    public Integer save(CategoriaOcupacional object) {
        if (object.getId() != null) {
            object.setId(null);
        }
        CategoriaOcupacional p = repository.save(object);
        return p.getId();
    }
    
    @Override
    public Integer update(CategoriaOcupacional object, Integer id) {
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
    public List<CategoriaOcupacional> findAll() {
        return repository.findAll(Sort.by(Sort.Order.asc("abreviado")));
    }
    
    @Override
    public Optional<CategoriaOcupacional> findById(Integer id) {
        return repository.findById(id);
    }
    
    public List<CategoriaOcupacional> findRootCats() {
        return repository.findByParentIsNull();
    }
    
    public List<CategoriaOcupacional> findChildCats() {
        return repository.findByParentIsNotNull();
    }
    
}
