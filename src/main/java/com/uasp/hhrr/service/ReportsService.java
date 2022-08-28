/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.reports.JasperReportsManager;
import com.uasp.hhrr.reports.Report;
import com.uasp.hhrr.reports.TipoReporte;
import com.uasp.hhrr.reports.datasources.GrupoEscalaDataSource;
import com.uasp.hhrr.reports.datasources.PlantillaACDataSource;
import com.uasp.hhrr.reports.submodel.GrupoEscala;
import com.uasp.hhrr.reports.submodel.PlantillaAprobadaCubierta;
import com.uasp.hhrr.repository.CategoriaOcupacionalRepository;
import com.uasp.hhrr.repository.DepartamentoCargoRepostory;
import com.uasp.hhrr.repository.EscalaRepository;
import com.uasp.hhrr.repository.TrabajadorRepository;
import com.uasp.hhrr.utils.RomansUtils;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class ReportsService {

    @Autowired
    JasperReportsManager reportsManager;

    @Autowired
    private DataSource dataSource;

    @Autowired
    DepartamentoCargoRepostory dcRepository;

    @Autowired
    CategoriaOcupacionalRepository coRepository;

    @Autowired
    EscalaRepository eRepository;

    @Autowired
    TrabajadorRepository tRepository;

    public Report obtenerReporte(String fileName, Map<String, Object> params)
            throws IOException, JRException, SQLException {
        Report report = new Report();
        String extension = params.get("tipo").toString().equalsIgnoreCase(TipoReporte.XLS.name()) ? ".xlsx" : ".pdf";
        report.setFileName(fileName + extension);

        ByteArrayOutputStream stream = reportsManager.export(fileName, params.get("tipo").toString(), params,
                dataSource.getConnection());

        byte[] bs = stream.toByteArray();
        report.setStream(new ByteArrayInputStream(bs));
        report.setLength(bs.length);

        return report;
    }

    public Report obtenerReporte(String fileName, Map<String, Object> params, JRDataSource source)
            throws IOException, JRException, SQLException {
        Report report = new Report();
        String extension = params.get("tipo").toString().equalsIgnoreCase(TipoReporte.XLS.name()) ? ".xlsx" : ".pdf";
        report.setFileName(fileName + extension);

        ByteArrayOutputStream stream = reportsManager.export(fileName, params.get("tipo").toString(), params, source);

        byte[] bs = stream.toByteArray();
        report.setStream(new ByteArrayInputStream(bs));
        report.setLength(bs.length);

        return report;
    }

    public PlantillaACDataSource generatePlantillaACDataSource() {
        PlantillaACDataSource ds = new PlantillaACDataSource();
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
        ds.addAll(list);

        return ds;
    }

    public GrupoEscalaDataSource generateGEDataSource() {
        GrupoEscalaDataSource ds = new GrupoEscalaDataSource();
        List<GrupoEscala> list = new ArrayList<>();

        eRepository.findAll().forEach(
                e -> {
                    list.add(new GrupoEscala(
                            e.getClasificador(),
                            tRepository.countByIdCargoIdEscalaIdAndIdCargoIdCatOcupAbreviado(e.getId(), "O"),
                            tRepository.countByIdCargoIdEscalaIdAndSexoAndIdCargoIdCatOcupAbreviado(e.getId(), "f", "O"),
                            tRepository.countByIdCargoIdEscalaIdAndIdCargoIdCatOcupAbreviado(e.getId(), "S"),
                            tRepository.countByIdCargoIdEscalaIdAndSexoAndIdCargoIdCatOcupAbreviado(e.getId(), "f", "S"),
                            tRepository.countByIdCargoIdEscalaIdAndIdCargoIdCatOcupAbreviado(e.getId(), "A"),
                            tRepository.countByIdCargoIdEscalaIdAndSexoAndIdCargoIdCatOcupAbreviado(e.getId(), "f", "A"),
                            tRepository.countByIdCargoIdEscalaIdAndIdCargoIdCatOcupAbreviado(e.getId(), "T"),
                            tRepository.countByIdCargoIdEscalaIdAndSexoAndIdCargoIdCatOcupAbreviado(e.getId(), "f", "T"),
                            tRepository.countByIdCargoIdEscalaIdAndIdCargoIdCatOcupAbreviado(e.getId(), "C"),
                            tRepository.countByIdCargoIdEscalaIdAndSexoAndIdCargoIdCatOcupAbreviado(e.getId(), "f", "C")));
                }
        );

        list.sort(Comparator.comparing((e) -> RomansUtils.romanToInt(e.getGrupo())));
        ds.addAll(list);

        return ds;
    }
}
