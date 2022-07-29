/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.model.Cargo;
import com.uasp.hhrr.model.Departamento;
import com.uasp.hhrr.model.DepartamentoCargo;
import com.uasp.hhrr.model.DepartamentoCargoPK;
import com.uasp.hhrr.model.Trabajador;
import com.uasp.hhrr.repository.CargoRepository;
import com.uasp.hhrr.repository.DepartamentoCargoRepostory;
import com.uasp.hhrr.repository.DepartamentoRepository;
import com.uasp.hhrr.repository.TrabajadorRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class DepartamentoCargoService implements Services<DepartamentoCargo, DepartamentoCargoPK> {

    @Autowired
    DepartamentoCargoRepostory repository;

    @Autowired
    DepartamentoRepository depRep;

    @Autowired
    CargoRepository cargoRep;

    @Autowired
    TrabajadorRepository trabRep;

    @Override
    public DepartamentoCargoPK save(DepartamentoCargo object) {
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

    public boolean disponibilidad(int idDep, int idCargo) {
        return disponibilidad(depRep.getById(idDep), cargoRep.getById(idCargo));
    }

    public boolean disponibilidad(int idDep, int idCargo, int idTrab) {
        Trabajador ex = new Trabajador();
        ex.setId(idTrab);
        ex.setIdDepartamento(depRep.findById(idDep).orElse(null));
        ex.setIdCargo(cargoRep.findById(idCargo).orElse(null));

        Optional<Trabajador> finded = trabRep.findOne(Example.of(ex));

        if (finded.isPresent()) {
            return true;
        } else {
            return disponibilidad(depRep.getById(idDep), cargoRep.getById(idCargo));
        }
    }

    public boolean disponibilidad(Departamento dep, Cargo cargo) {
        Optional<DepartamentoCargo> finded = findById(new DepartamentoCargoPK(dep.getId(), cargo.getId()));

        if (finded.isPresent()) {
            return trabRep.countByIdDepartamentoIdAndIdCargoId(dep.getId(), cargo.getId()) < finded.get().getPlazas();
        } else {
            return false;
        }
    }

}
