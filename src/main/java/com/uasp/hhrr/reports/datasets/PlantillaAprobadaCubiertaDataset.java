/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.datasets;

import com.uasp.hhrr.reports.submodel.PlantillaAprobadaCubierta;
import com.uasp.hhrr.repository.CategoriaOcupacionalRepository;
import com.uasp.hhrr.repository.DepartamentoCargoRepostory;
import com.uasp.hhrr.repository.TrabajadorRepository;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author Tapanes
 */
@Component
public class PlantillaAprobadaCubiertaDataset {

    @Autowired
    DepartamentoCargoRepostory dcRepository;

    @Autowired
    CategoriaOcupacionalRepository coRepository;

    @Autowired
    TrabajadorRepository tRepository;

    protected PlantillaAprobadaCubiertaDataset() {

    }

    public List<PlantillaAprobadaCubierta> getDataset() {
        List<PlantillaAprobadaCubierta> list = new ArrayList<>();

        coRepository.findAll().forEach(
                co -> {
                    boolean isParent = co.getParent() == null;

                    list.add(new PlantillaAprobadaCubierta(
                            isParent,
                            co.getAbreviado(),
                            co.getNombre(),
                            !isParent ? dcRepository.plazasByCatOcupId(co.getId()) : dcRepository.plazasByCatOcupAbrev(co.getAbreviado()),
                            !isParent ? tRepository.countByIdCargoIdCatOcupId(co.getId()) : tRepository.countByIdCargoIdCatOcupAbreviado(co.getAbreviado()),
                            !isParent ? tRepository.countByIdCargoIdCatOcupIdAndMision(co.getId(), true) : tRepository.countByIdCargoIdCatOcupAbreviadoAndMision(co.getAbreviado(), true))
                    );
                }
        );

        list.sort(Comparator.comparing(PlantillaAprobadaCubierta::getAbreviado));

        return list;
    }

}
